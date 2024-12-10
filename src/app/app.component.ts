import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from './services/password.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Password } from './models/password';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form: FormGroup;
  credentials: Password[] = [
  ];

  selectedCardIndex: number | null = null;
  passwordId: number | null = null;
  // Options for autocomplete
  categories = ['school', 'work', 'personal', 'gaming'];
  apps: any = {
    school: ['Ilias', 'Hisone', 'Khan Academy'],
    work: ['Slack', 'Zoom', 'Asana'],
    personal: ['Notion', 'Evernote', 'Google Keep'],
    gaming: ['Steam', 'Epic Games', 'Discord']
  };
  filteredApps: string[] = [];

  constructor(private fb: FormBuilder, private passwordSVC: PasswordService, public dialog: MatDialog, private snackBar: MatSnackBar, public authSVC: AuthService) {
    // Initialize form
    this.form = this.fb.group({
      category: [null],
      app: [null, Validators.required],
      userName: [null, Validators.required],
      password: [null, Validators.required]
    });
    // Watch for category changes
    this.form.get('category')?.valueChanges.subscribe((value) => {
      this.filteredApps = this.apps[value] || [];
    });
    passwordSVC.getAllPasswords().subscribe(val => {
      console.log(val)
      this.credentials = val
    })
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.option.value;
    this.filteredApps = this.apps[selectedCategory] || [];
    this.form.get('app')?.reset(); // Clear app field when category changes
  }

  onSubmit(): void {
    if (!this.authSVC.verify()) {
      return;
    }
    if (this.passwordId == null) {
      this.passwordSVC.addPassword(this.form.value).subscribe(val => {
        console.log(val)
        this.credentials.unshift(val);
        this.clearForm();
        this.snackBar.open('Password successfully added', 'Done', {
          duration: 3000
        });
      })
    } else {
      this.passwordSVC.updatePassword(this.passwordId, this.form.value).subscribe(() => {
        this.replacePasswordById(this.passwordId!, this.form.value);
        this.clearForm();
        this.snackBar.open('Password successfully updated', 'Done', {
          duration: 3000
        });
      })
    }
  }


  replacePasswordById(id: number, newPassword: Password) {
    const index = this.credentials.findIndex(p => p.id === id);

    if (index !== -1) {
      console.log(newPassword)
      newPassword.id = id;
      this.credentials[index] = newPassword;
    } else {
      console.log('Item with id ' + id + ' not found');
    }
  }


  onEditCredential(id: number): void {
    this.passwordId = id;
    this.passwordSVC.getDecryptedPasswordById(id).subscribe((val) => {
      this.passwordId = id;
      this.form.patchValue({
        category: val.category,
        app: val.app,
        userName: val.userName,
        password: this.authSVC.user.verified ? val.decryptedPassword : ""
      })
    })
  }

  clearForm() {
    this.passwordId = null;
    this.form.reset({
      category: null,
      app: null,
      userName: null,
      password: null
    });
  }

  onDeleteCredential(password: Password) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { password: password }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(password.id!);
      }
    });
  }

  deleteItem(id: number) {
    if (!this.authSVC.verify()) {
      return;
    }
    this.passwordSVC.deletePassword(id).subscribe(() => {
      const index = this.credentials.findIndex(pass => pass.id === id);
      if (index !== -1) {
        this.credentials.splice(index, 1);
      }
      this.snackBar.open('Password deleted', 'Done', {
        duration: 3000
      });
    })

  }
}

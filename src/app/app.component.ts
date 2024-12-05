import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Password, PasswordService } from './services/password.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder, private passwordSVC: PasswordService, public dialog: MatDialog, private snackBar: MatSnackBar) {
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
    if (this.passwordId == null) {
      this.passwordSVC.addPassword(this.form.value).subscribe(() => {
        this.credentials.unshift(this.form.value);
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
    const index = this.credentials.findIndex(p => p.id === id);  // Find the index by id

    if (index !== -1) {
      console.log(newPassword)
      newPassword.id = id;
      this.credentials[index] = newPassword;  // Replace the item at the found index
    } else {
      console.log('Item with id ' + id + ' not found');
    }
  }

  onCardSelect(index: number): void {
    this.selectedCardIndex = this.selectedCardIndex === index ? null : index;
  }

  onEditCredential(index: number): void {
    console.log('Edit credential at index', index);
    this.passwordSVC.getPasswordById(index).subscribe((val) => {
      this.passwordId = index;
      this.form.patchValue({
        category: val.category,
        app: val.app,
        userName: val.userName,
        password: ""
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

  // Open delete modal
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

  // Function to handle item deletion
  deleteItem(id: number) {
    this.passwordSVC.deletePassword(id).subscribe(() => {
      const index = this.credentials.findIndex(pass => pass.id === id); // Find the index
      if (index !== -1) {
        this.credentials.splice(index, 1); // Remove the item at that index
      }
      this.snackBar.open('Password deleted', 'Done', {
        duration: 3000
      });
    })

    // Add your deletion logic here
  }
}

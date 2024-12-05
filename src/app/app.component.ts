import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Password, PasswordService } from './services/password.service';

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

  constructor(private fb: FormBuilder, private passwordSVC: PasswordService) {
    // Initialize form
    this.form = this.fb.group({
      category: [null],
      app: [null, Validators.required],
      username: [null, Validators.required],
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
      })
    } else {
      this.passwordSVC.updatePassword(this.passwordId, this.form.value).subscribe(() => {
        this.credentials.unshift(this.form.value);
        this.clearForm();
      })
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
        username: val.userName,
        password: ""
      })
    })
  }

  clearForm() {
    this.passwordId = null;
    this.form.reset({
      category: null,
      app: null,
      username: null,
      password: null
    });
  }

  onDeleteCredential(index: number): void {
    console.log('Delete credential at index', index);
    this.credentials.splice(index, 1);
  }
}

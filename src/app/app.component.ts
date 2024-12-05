import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from './services/password.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form: FormGroup;

  credentials = [
    {
      username: 'john_doe',
      app: 'Slack',
      category: 'Work',
      password: 'password123',
    },
    {
      username: 'jane_smith',
      app: 'Steam',
      category: 'Gaming',
      password: 'gamingpass',
    },
    {
      username: 'alex_brown',
      app: 'Notion',
      category: 'Personal',
      password: 'notionpass',
    },
  ];

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
    passwordSVC.getAllPasswords().subscribe(val => console.log(val))
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.option.value;
    this.filteredApps = this.apps[selectedCategory] || [];
    this.form.get('app')?.reset(); // Clear app field when category changes
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.passwordSVC.addPassword(this.form.value).subscribe(() => {
        this.credentials.unshift(this.form.value);
      })
    }
  }

  selectedCardIndex: number | null = null;

  onCardSelect(index: number): void {
    this.selectedCardIndex = this.selectedCardIndex === index ? null : index;
  }

  onEditCredential(index: number): void {
    console.log('Edit credential at index', index);
    // Implement edit logic
  }

  onDeleteCredential(index: number): void {
    console.log('Delete credential at index', index);
    this.credentials.splice(index, 1);
  }
}

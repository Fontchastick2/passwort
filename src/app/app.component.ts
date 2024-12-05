import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form: FormGroup;

  // Options for autocomplete
  categories = ['school', 'work', 'personal', 'gaming'];
  apps: any = {
    school: ['Ilias', 'Hisone', 'Khan Academy'],
    work: ['Slack', 'Zoom', 'Asana'],
    personal: ['Notion', 'Evernote', 'Google Keep'],
    gaming: ['Steam', 'Epic Games', 'Discord']
  };
  filteredApps: string[] = [];

  constructor(private fb: FormBuilder) {
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
  }

  onCategoryChange(event: any): void {
    const selectedCategory = event.option.value;
    this.filteredApps = this.apps[selectedCategory] || [];
    this.form.get('app')?.reset(); // Clear app field when category changes
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}

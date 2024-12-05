import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credential-card',
  templateUrl: './credential-card.component.html',
  styleUrls: ['./credential-card.component.scss'],
})
export class CredentialCardComponent {
  @Input() credential: any;
  @Input() isSelected: boolean = false;
  @Output() selectCard = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }

  onSelect(): void {
    this.selectCard.emit();
  }
}

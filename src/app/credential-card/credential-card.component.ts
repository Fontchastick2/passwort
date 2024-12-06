import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PasswordService } from '../services/password.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-credential-card',
  templateUrl: './credential-card.component.html',
  styleUrls: ['./credential-card.component.scss'],
})
export class CredentialCardComponent {
  @Input() credential: any;
  @Input() isSelected: boolean = false;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  showPassword: boolean = false;
  password: string = "";

  constructor(private passwordSVC: PasswordService, private authSVC: AuthService) {
  }

  ngOnInit() {
    console.log(this.credential)
    this.passwordSVC.getDecryptedPasswordById(this.credential.id).subscribe(val => {
      this.password = val.decryptedPassword
    })
  }

  togglePasswordVisibility(): void {
    if (this.authSVC.verify()) {
      this.showPassword = !this.showPassword;
    }
  }

  onEdit(): void {
    this.edit.emit();
  }

  onDelete(): void {
    this.delete.emit();
  }
}

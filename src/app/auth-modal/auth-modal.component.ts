import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PasswordService } from '../services/password.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  passkey: string = 'jean@groupm';

  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private passwordSVC: PasswordService,
    private snackBar: MatSnackBar
  ) {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onValidate(): void {
    if (this.passkey) {
      this.passwordSVC.verifyValue(this.passkey).subscribe({
        next: (val) => {
          this.dialogRef.close({ validated: true });
        },
        error: (err) => {
          this.snackBar.open('Unknown Passkey', 'Done', {
            duration: 3000
          });
        }
      });

    } else {
      alert('Please enter a passkey.');
    }
    this.passkey = "";
  }
}

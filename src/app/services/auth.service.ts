import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = {
    name: "No name",
    profilePicture: "https://via.placeholder.com/50",
    verified: false,
  };

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  verify(): boolean {
    if (!this.user.verified) {
      this.snackBar.open('This action requires to be verified', 'Done', {
        duration: 3000
      });
      this.openAuthModal()
    }
    return this.user.verified;
  }

  openAuthModal() {
    if (this.user.verified) {
      this.snackBar.open('Profile already verfiied', 'Done', {
        duration: 3000
      });
      return
    }
    const dialogRef = this.dialog.open(AuthModalComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = {
          name: "Jean F.",
          profilePicture: "https://cdn.exchangewire.com/wp-content/uploads/2019/06/groupm.png",
          verified: true,
        };
        this.snackBar.open('Identity verified: Welcome ' + this.user.name, 'Done', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      }
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // Close dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Close dialog and confirm delete
  onConfirm(): void {
    this.dialogRef.close(true);  // Sends true to confirm the action
  }
}

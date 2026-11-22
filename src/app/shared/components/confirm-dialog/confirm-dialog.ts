import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedButton } from '../shared-button/shared-button';
@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, SharedButton],
  template: `<h2 mat-dialog-title>نحذف الجلسة؟</h2>
    <mat-dialog-content
      >الجلسة وملاحظاتها هتتمسح من ملف البيانات. مفيش تراجع تلقائي.</mat-dialog-content
    ><mat-dialog-actions
      ><app-shared-button [mat-dialog-close]="true">أيوه، احذفي الجلسة</app-shared-button
      ><app-shared-button [secondary]="true" [mat-dialog-close]="false"
        >إلغاء</app-shared-button
      ></mat-dialog-actions
    >`,
})
export class ConfirmDialog {}

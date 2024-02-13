import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-without-internet',
  templateUrl: './without-internet.component.html',
  styleUrls: ['./without-internet.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class WithoutInternetComponent {
  constructor(
    public dialogRef: MatDialogRef<WithoutInternetComponent>,
    private router: Router
    ) {}

  @Input() pos: number = 1;

  onNoClick(): void {
    this.dialogRef.close();
  }

  exitUser() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.dialogRef.close();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginGuard } from 'src/app/shared/guards/login.guard';
import { MatIconModule } from '@angular/material/icon';
import { WithoutInternetComponent } from 'src/app/shared/components/without-internet/without-internet.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
    ]),
    MatIconModule,
    MatDialogModule,
    WithoutInternetComponent
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionGuard } from '../../shared/guards/session.guard';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
        canActivate: [SessionGuard]
      },
    ]),
    ReactiveFormsModule,
    MatIconModule,
    NgbAlertModule
  ]
})
export class LoginModule { }

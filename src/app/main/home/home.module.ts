import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginGuard } from '../../shared/guards/login.guard';
import { WithoutInternetComponent } from '../../shared/components/without-internet/without-internet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from '@media/environments';
import { SocketIoModule } from 'ngx-socket-io';



@NgModule({
  declarations: [],
  imports: [
    SocketIoModule.forRoot({ url: environment.apiNode, options: {} }),
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
      },
    ]),
    MatDialogModule,
    WithoutInternetComponent,
  ]
})
export class HomeModule { }

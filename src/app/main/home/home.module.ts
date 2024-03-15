import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginGuard } from '../../shared/guards/login.guard';
import { WithoutInternetComponent } from '../../shared/components/without-internet/without-internet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '@media/environments';



@NgModule({
  declarations: [],
  imports: [
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
    SocketIoModule.forRoot({ url: environment.apiNodeWs, options: {} }),
  ]
})
export class HomeModule { }

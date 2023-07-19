import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { MatIconModule } from '@angular/material/icon';
import { ClientComponent } from './client/client.component';
import { StoreComponent } from './store/store.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ClientComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ClientComponent,
      },
      {
        path: 'point_of_sale/:id',
        component: StoreComponent,
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]),
    PagenotfoundComponent,
    MatIconModule,
    NgbAlertModule
  ]
})
export class HomeStoreModule { }

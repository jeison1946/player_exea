import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { HomeStoreComponent } from './home-store.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeStoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: HomeStoreComponent,
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]),
    PagenotfoundComponent,
    MatIconModule
  ]
})
export class HomeStoreModule { }

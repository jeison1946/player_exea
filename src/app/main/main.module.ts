import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      /* {
        path: 'store',
        loadChildren: () => import('./home-store/home-store.module').then(m => m.HomeStoreModule)
      }, */
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]),
  ],
})
export class MainModule { }

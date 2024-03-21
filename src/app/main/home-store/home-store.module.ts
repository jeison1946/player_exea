import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { MatIconModule } from '@angular/material/icon';
import { ClientComponent } from './client/client.component';
import { StoreComponent } from './store/store.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestSongsComponent } from 'src/app/shared/components/request-songs/request-songs.component';
import { OptionsMenuComponent } from 'src/app/shared/components/options-menu/options-menu.component';
import { SearchSongsComponent } from 'src/app/shared/components/search-songs/search-songs.component';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '@media/environments';


@NgModule({
  declarations: [
    ClientComponent,
    StoreComponent,
  ],
  imports: [
    CommonModule,
    SocketIoModule.forRoot({ url: environment.apiNode, options: {} }),
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
    //Componets
    PagenotfoundComponent,
    RequestSongsComponent,
    OptionsMenuComponent,
    SearchSongsComponent,
    //Modules
    MatIconModule,
    NgbAlertModule
  ]
})
export class HomeStoreModule { }

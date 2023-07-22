import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  content:any = {
    error:true
  };

  displayLoader:boolean = false;

  pointOfSale:any;

  alerts:any;

  searchSongs:any;

  loaderSong:boolean = false;

  public navItems: any[] = [
    {title: 'Solicita una canción', id: 'request_song'},
    {title: 'En cola', id: 'in_cola'},
  ];

  selectedComponent: any = {title: 'Solicita una canción', id: 'request_song'};

  constructor(private route: ActivatedRoute, public storeService: StoreService){
  }

  ngOnInit(): void {
    this.getStore();
  };

  loadComponent(event: any) {
    this.selectedComponent = event;
    this.searchSongs = false;
  }

  getStore() {
    this.displayLoader = true;
    this.pointOfSale = this.route.snapshot.paramMap.get('id');
    this.storeService.getPointOfsale(this.pointOfSale).subscribe(response => {
      if(response.code == 200) {
        this.content = response.payload
      }
      this.displayLoader = false;
    },
    err => {
      this.displayLoader = false;
    })
  }

  close() {
    this.alerts = {};
  }

  addResquestLog(data:any) {
    this.storeService.addRequestSong(data, this.pointOfSale).subscribe(response => {
      if(response.code == 200) {
        this.alerts = {
          type: 'success',
          message: response.payload.description
        };
        setTimeout(() => {
          this.alerts = false;
        }, 3000);
      }
    },
    err => {

      this.alerts = {
        type: 'danger',
        message: 'Esta canción ya ha sido solictada, Por favor intente más tarde o eliga otra.'
      };
      setTimeout(() => {
        this.alerts = false;
      }, 3000);
    })
  }

  listSongByTitle(event:any) {
    if (!event) {
      this.searchSongs = false;
    }
    else {
      this.searchSongs =  event;
    }
  }
}

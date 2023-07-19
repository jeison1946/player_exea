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

  constructor(private route: ActivatedRoute, public storeService: StoreService){
  }

  ngOnInit(): void {
    this.getStore();
  };

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
}

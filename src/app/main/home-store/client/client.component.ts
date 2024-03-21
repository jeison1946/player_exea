import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { StoreService } from 'src/app/shared/services/store/store.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  content:any = {
    error:true
  };

  displayLoader:boolean = false;

  storeId:any;

  favIcon: HTMLLinkElement | null = document.querySelector('#favIcon');
  titlePage: HTMLLinkElement | null = document.querySelector('#titlePage');

  urlLive: string = '';

  constructor(private route: ActivatedRoute, public storeService: StoreService, private socket: Socket){
  }

  ngOnInit(): void {
    this.getStore();
  };

  getStore() {
    this.displayLoader = true;
    this.storeId = this.route.snapshot.paramMap.get('id');
    this.urlLive = this.storeService.getUrlSong(this.storeId);
    this.storeService.getStore(this.storeId).subscribe(response => {
      if(response.code == 200) {
        this.content = response.payload;
        if(this.favIcon && this.titlePage) {
          this.favIcon.href = this.content.logo.url;
          this.titlePage.textContent = this.content.title
        }
      }
      this.displayLoader = false;
      this.socket.emit('statusClient', { hello: 'word'});
      this.socket.on('statusClient', (data: any) => {
        console.log(data);
      });
    },
    err => {
      this.displayLoader = false;
    })
  }

}

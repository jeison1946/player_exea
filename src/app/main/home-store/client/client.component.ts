import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, public storeService: StoreService){
  }

  ngOnInit(): void {
    this.getStore();
  };

  getStore() {
    this.displayLoader = true;
    this.storeId = this.route.snapshot.paramMap.get('id');
    this.storeService.getStore(this.storeId).subscribe(response => {
      if(response.code == 200) {
        this.content = response.payload
      }
      this.displayLoader = false;
    },
    err => {
      this.displayLoader = false;
    })
  }

}

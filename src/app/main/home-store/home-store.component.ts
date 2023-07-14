import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/shared/services/store/store.service';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss']
})
export class HomeStoreComponent {
  content:any = {
    error:true
  };
  constructor(private route: ActivatedRoute, public storeService: StoreService){
  }

  ngOnInit(): void {
    this.getStore();
  };

  getStore() {
    const id:any = this.route.snapshot.paramMap.get('id');
    this.storeService.getStore(id).subscribe(response => {
      if(response.code == 200) {
        this.content = response.payload
      }
    })
  }
}

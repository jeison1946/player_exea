import { Component, Input } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-songs',
  templateUrl: './request-songs.component.html',
  styleUrls: ['./request-songs.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class RequestSongsComponent {
  listSong: any;

  @Input() poSale: any;

  @Input() backGroundColor: string = '';

  constructor(public storeService: StoreService){
  }

  ngOnInit(): void {
    this.getListSong();
  };

  getListSong() {
    this.storeService.getListSongRequest(this.poSale).subscribe(response => {
      if(response.code == 200) {
        this.listSong = response.payload.songs;
      }
      
    });
  }
}

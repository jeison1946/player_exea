import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongsService } from '../../services/songs/songs.service';

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.component.html',
  styleUrls: ['./search-songs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchSongsComponent {

  myControl = new FormControl('');

  @Output() listSong = new EventEmitter<any>();

  loader:boolean = false;

  constructor(private songService: SongsService) {
    /* this.myControl.valueChanges.subscribe(value => {
      if(value && value.length >= 4) {
        this.loader = true;
        this.songService.songByTitle(value).subscribe(response => {
          if(response.code == 200) {
            this.loader = false;
            this.listSong.emit(response.payload);
          }
        });
      }
      else {
        console.log('vacio');
        this.loader = false;
        this.listSong.emit(false);
      }
    }); */
  }

  eventText(event:any) {
    const input = <HTMLInputElement>document.getElementById("inputext");
    const text:any = input.value;
    if(text && text.length >= 4) {
      this.loader = true;
        this.songService.songByTitle(text).subscribe(response => {
          if(response.code == 200) {
            this.loader = false;
            this.listSong.emit(response.payload);
          }
        });
    }
    else {
      this.loader = false;
      this.listSong.emit(false);
    }
  }
}

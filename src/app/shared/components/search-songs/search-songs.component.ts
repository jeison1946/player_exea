import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() pos: number|boolean = false;

  loader:boolean = false;

  constructor(private songService: SongsService) {
  }

  eventText(event:any) {
    const input = <HTMLInputElement>document.getElementById("inputext");
    const text:any = input.value;
    if(text && text.length >= 4) {
      this.loader = true;
        this.songService.songByTitle(text, this.pos).subscribe(response => {
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

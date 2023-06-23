import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SongsService } from 'src/app/shared/services/songs/songs.service';
import { UserloginService } from 'src/app/shared/services/user/userlogin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public nextSong:any = {};

  @ViewChild('audioPlayer') audioPlayer: ElementRef | undefined;

  currentTime: any = '0:00';

  currentUser: any;

  isListen:boolean = false;

  currentCustomer: any;

  constructor(public songService: SongsService, private router: Router, private userService: UserloginService) {
  }


  ngOnInit() {
    this.currentUser = this.getLocalStorage('user-session', true);
    this.currentCustomer = this.getLocalStorage('point-of-sale', true);
    this.getSongNext();
  }

  updateTime(time:any) {
    this.currentTime = this.convertTime(time.srcElement.currentTime);
  }

  getLocalStorage(key: string, parser: boolean = false): string | null {
    let data = localStorage.getItem(key);
    if(parser) {
      data = JSON.parse(atob(localStorage.getItem(key) || "{}"));
    }
    return data;
  }

  onPlay(){
    const container = this.audioPlayer?.nativeElement;
    container.play();
    this.isListen = true;
    this.songService.logSong(this.nextSong,
      this.currentCustomer.id,
      this.currentUser.punto_de_venta
      ).subscribe(response => {
    });
  }

  onPuase() {
    const container = this.audioPlayer?.nativeElement;
    container.pause();
    this.isListen = false;
  }

  finishSong() {
    this.songService.getNextSong(this.currentUser.punto_de_venta).subscribe(response => {
      if (response.code == 200) {
        this.songService.validateSong(response.payload.song.url).subscribe(res => {
          this.nextSong = response.payload.song;
          this.onPlay();
        },
        err => {
          if(err.status == 200) {
            this.nextSong = response.payload.song;
            this.onPlay();
          } 
          else {
            this.nextSong = {error:true}
            this.finishSong();
          }
        });
      }
    },
    err => {
      if(err.status == 500) {
        this.exitUser();
      }
    });
  }

  convertTime(time: number): string {
    const minutes = Math.floor(time / 60); // Obtener los minutos
    const seconds = Math.floor(time % 60); // Obtener los segundos

    // Formatear el tiempo en minutos y segundos
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return formattedTime;
  }

  exitUser() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getSongNext() {
    this.songService.getNextSong(this.currentUser.punto_de_venta).subscribe(response => {
      if (response.code == 200) {
        this.songService.validateSong(response.payload.song.url).subscribe(res => {
          this.nextSong = response.payload.song;
        },
        err => {
          if(err.status == 200) {
            this.nextSong = response.payload.song;
          } 
          else {
            this.nextSong = {error:true}
            this.getSongNext();
          }
        });
      }
    },
    err => {
      if(err.status == 500) {
        this.exitUser();
      }
    });
  }

}

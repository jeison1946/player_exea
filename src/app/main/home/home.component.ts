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

  @ViewChild('audioPlayer') audioPlayer: any;

  currentTime: any = '0:00';

  currentUser: any;

  isListen:boolean = false;

  currentCustomer: any;

  displayLoader:boolean = false;

  rule: any = false

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
    const player = <HTMLAudioElement>document.getElementById("player");
    player.setAttribute('src', this.nextSong.url);
    player.play();
    this.isListen = true;
    this.songService.logSong(
      this.nextSong,
      this.currentUser.punto_de_venta,
      this.rule
      ).subscribe(response => {
    });
  }

  onPuase() {
    const player = <HTMLAudioElement>document.getElementById("player");
    player.pause();
    this.isListen = false;
  }

  finishSong() {
    this.displayLoader = true;
    this.songService.getNextSong(this.currentUser.punto_de_venta).subscribe(response => {
      if (response.code == 200) {
        this.displayLoader = false;
        this.rule = response.payload.ruleId;
        this.nextSong = response.payload.song;
        this.onPlay();
        this.listenByTime(response.payload.rules_hours);
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
    this.displayLoader = true;
    this.songService.getNextSong(this.currentUser.punto_de_venta).subscribe(response => {
      if (response.code == 200) {
        this.rule = response.payload.ruleId;
        this.nextSong = response.payload.song;
        this.displayLoader = false;
        this.listenByTime(response.payload.rules_hours);
      }
    },
    err => {
      if(err.status == 500) {
        this.exitUser();
      }
    });
  }

  listenByTime(ruleHours:any) {
    if(ruleHours) {
      Object.entries(ruleHours).forEach((element:any) => {
        const hours = element[1].hours;
        hours.forEach((item:any, index:any) => {
          this.addTimer(item, element[0], element[1].id, index);
        })
      });
    }
  }

  songByTime(ruleId:number, id:number) {
    this.displayLoader = true;
    this.songService.songByRule(id).subscribe(response => {
      this.displayLoader = false;
      this.rule = ruleId;
      this.nextSong = response.payload.song;
      this.onPlay();
    });
  }

  addTimer(time: any, ruleId:number, id:number, index:any) {
    const existe:any = localStorage.getItem(`${ruleId}-${index}`);
    const now:Date = new Date();
    const timeNew = new Date(time).valueOf() - now.valueOf();
    if(existe) {
      const current = JSON.parse(existe);
      clearTimeout(current.timer);
      localStorage.removeItem(`${ruleId}-${index}`);
    }
    if(timeNew > 10) {
      const timer:any = setTimeout( () => {
        this.songByTime(ruleId, id);
      }, timeNew);
      const data = {
        ruleId: ruleId,
        id: time,
        timer: timer,
        index:index
      }
      localStorage.setItem(`${ruleId}-${index}`, JSON.stringify(data));
    }
  }
}

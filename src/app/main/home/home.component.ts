import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SongsService } from '../../shared/services/songs/songs.service';
import {MatDialog} from '@angular/material/dialog';
import { WithoutInternetComponent } from '../../shared/components/without-internet/without-internet.component';
import { ConnectionService } from 'ng-connection-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { MaterialCssVarsService } from 'angular-material-css-vars';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule
  ],
})
export class HomeComponent implements OnInit{
  public dataLoad:any = {};

  @ViewChild('audioPlayer') audioPlayer: any;

  currentTime: any = '0:00';

  currentUser: any;

  isListen:boolean = false;

  currentCustomer: any;

  displayLoader:boolean = false;

  rule: any = false

  accessConection: boolean = false;

  volume: number = 90;

  mobile: boolean;

  titlePage: HTMLLinkElement | null = document.querySelector('#titlePage');

  constructor(
    public songService: SongsService,
    private router: Router,
    public dialog: MatDialog,
    private connectionService:ConnectionService,
    public materialCssVarsService: MaterialCssVarsService,
    private deviceDetector: DeviceDetectorService,
    private socket: Socket
    ) {
      this.mobile = this.deviceDetector.isMobile();
  }


  ngOnInit() {
    this.connectionService.monitor().subscribe(async (isConnected:any) => {
      if(isConnected.hasNetworkConnection) {
        this.accessConection = true;
        this.currentUser = this.getLocalStorage('user-session', true);
        this.currentCustomer = this.getLocalStorage('point-of-sale', true);
        this.titlePage ? this.titlePage.textContent = "Brand Casting | " + this.currentCustomer.nombre_emisora : false;
        this.materialCssVarsService.setPrimaryColor(this.currentCustomer.color_primario);
        this.materialCssVarsService.setAccentColor('#3f51b5')
        this.getSongNext();
      }
    });
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
    player.setAttribute('src', this.dataLoad.song.url);
    player.play();
    this.isListen = true;
    this.songService.logSong(
      this.dataLoad,
      this.currentUser.punto_de_venta
      ).subscribe(response => {
    });
    this.socket.emit('statusPointofsale', {
      pos: this.currentUser.punto_de_venta,
      idClient: this.socket.ioSocket.id,
      status: true,
    });
  }

  onPuase() {
    const player = <HTMLAudioElement>document.getElementById("player");
    player.pause();
    this.isListen = false;
    this.socket.emit('statusPointofsale', {
      pos: this.currentUser.punto_de_venta,
      idClient: this.socket.ioSocket.id,
      status: false,
    });
  }

  onVolumeChange(e:any) {
    this.volume = e.srcElement.value;
    const player = <HTMLAudioElement>document.getElementById("player");
    player.volume = this.volume / 100;
  }

  actionVolume(action:boolean) {
    const player = <HTMLAudioElement>document.getElementById("player");
    let volume = this.volume;
    if(action) {
      volume += 5;
    }
    else{
      volume -= 5;
    }
    if(volume >= 0 && volume <= 100){
      player.volume = volume / 100;
      this.volume = volume;
    }

  }

  finishSong() {
    this.displayLoader = true;
    this.songService.getNextSong(this.currentUser.punto_de_venta).subscribe(response => {
      if (response.code == 200) {
        this.displayLoader = false;
        this.rule = response.payload.ruleId;
        this.dataLoad = response.payload;
        this.onPlay();
        this.listenByTime(response.payload.rules_hours);
      }
    },
    err => {
      this.openDialog();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(WithoutInternetComponent);
    dialogRef.componentInstance.pos = this.currentUser.punto_de_venta
    dialogRef.afterClosed().subscribe(async result => {
      await this.router.navigateByUrl('.', { skipLocationChange: true });
      return this.router.navigateByUrl('/');
    });
  }

  getSongNext() {
    this.displayLoader = true;
    this.songService.getNextSong(this.currentUser.punto_de_venta).subscribe(response => {
      if (response.code == 200) {
        this.rule = response.response.ruleId;
        this.dataLoad = response.response;
        this.displayLoader = false;
        this.listenByTime(response.response.rules_hours);
      }
    },
    err => {
      this.openDialog();
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
      this.dataLoad = response.payload;
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


  getDateMilisegunds(dateString: string){
    const parts = dateString.split(" ");
    const months:any = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const dateObject = new Date(
      Date.UTC(
        parseInt(parts[3]), // Year
        months[parts[1]],   // Month
        parseInt(parts[2]), // Day
        parseInt(parts[4]), // Hour
        parseInt(parts[5]), // Minute
        parseInt(parts[6])  // Second
      )
    );

    return dateObject.getTime();
  }
}

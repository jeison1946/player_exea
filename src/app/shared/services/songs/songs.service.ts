import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@media/environments';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private environmentVars = environment;

  constructor(
    private httpClient: HttpClient
  ) { }

  getNextSong(posId: any) {
    const token = atob(localStorage.getItem('token-session') || '') ?? false;
    const headers = {'X-AUTH-TOKEN': token}
    let url = `${this.environmentVars.apiNode}/rules?pos=${posId}`;
    return this.httpClient.get<any>(url, {headers:headers});
  }

  logSong(data: any, pos:any) {
    const token = atob(localStorage.getItem('token-session') || '') ?? false;
    const headers = {
      'X-AUTH-TOKEN': token,
      'Content-Type':'application/json'
    }
    const currentDate = new Date();
    currentDate.setUTCHours(currentDate.getUTCHours() - 5);
    const fromObject: any = {
      "created": currentDate,
      "title": data.song.title,
      "author": data.song.artist,
      "song_id": parseInt(data.song.id),
      "point_of_sale": parseInt(pos),
      "rule_id": parseInt(data.ruleId),
      "name_rule": data.name
    }
    let url = `${this.environmentVars.apiNode}/rules`;
    return this.httpClient.post<any>(url, JSON.stringify(fromObject), {headers:headers});
  }

  songByRule(id:any){
    const token = atob(localStorage.getItem('token-session') || '') ?? false;
    const headers = {'X-AUTH-TOKEN': token}
    let url = `${this.environmentVars.apiUrl}/player/song/${id}`;
    return this.httpClient.get<any>(url, {headers:headers});
  }

  validateSong(url: string) {
    return this.httpClient.get<any>(url);
  }

  songByTitle(title: string, pos:number|boolean) {
    let posQuery = '';
    if(pos) {
      posQuery = `&idpos=${pos}`
    }
    let url = `${this.environmentVars.apiUrl}/player/song?title=${title}${posQuery}`;
    return this.httpClient.get<any>(url);
  }
}

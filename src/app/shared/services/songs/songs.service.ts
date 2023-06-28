import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@media/environments';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private urlBase = environment.apiUrl;
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getNextSong(posId: any) {
    const token = atob(localStorage.getItem('token-session') || '') ?? false;
    const headers = {'X-AUTH-TOKEN': token}
    let url = `${this.urlBase}/player/next/${posId}`;
    return this.httpClient.get<any>(url, {headers:headers});
  }

  logSong(data: any, pos:number, rule:any) {
    const token = atob(localStorage.getItem('token-session') || '') ?? false;
    const headers = {
      'X-AUTH-TOKEN': token,
      'Content-Type':'application/json'
    }
    const fromObject: any = {
        "title": data.title,
        "author": data.albumartist,
        "song_id": data.self.id,
        "pos_id": pos,
        "rule_id": rule
      }
    let url = `${this.urlBase}/song/history`;
    return this.httpClient.post<any>(url, JSON.stringify(fromObject), {headers:headers});
  }

  validateSong(url: string) {
    return this.httpClient.get<any>(url);
  }
}

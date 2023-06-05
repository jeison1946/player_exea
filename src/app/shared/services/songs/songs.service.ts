import { HttpClient, HttpParams } from '@angular/common/http';
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
    let url = `${this.urlBase}/player/next/${posId}.json`;
    return this.httpClient.get<any>(url);
  }

  logSong(data: any, pointSale: number, pos:number, token: string | null) {
    const fromObject: any = {
        "title": data.title,
        "author": data.artist.name,
        "song_id": data.id,
        "pos_id": pos,
        "customer_id": pointSale
      }
      console.log()
    let url = `${this.urlBase}/songs-history.json`;
    return this.httpClient.post<any>(url, JSON.stringify(fromObject));
  }
}

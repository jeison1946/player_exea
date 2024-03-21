import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@media/environments';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private urlBase = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getStore(id: string) {
    let url = `${this.urlBase}/customer/data/${id}`;
    return this.httpClient.get<any>(url);
  }

  getUrlSong(id: string): string {
    return `${environment.apiNode}/store/live/${id}`;
  }

  getPointOfsale(id: string) {
    let url = `${this.urlBase}/point_of_sale/data/${id}`;
    return this.httpClient.get<any>(url);
  }

  addRequestSong(data: any, pointOfsale:any) {
    const headers = {
      'Content-Type':'application/json'
    }
    const fromObject: any = {
        "title": data.title,
        "author": data.artist,
        "song_id": data.id,
        "pos_id": pointOfsale,
      }
    let url = `${this.urlBase}/song/request`;
    return this.httpClient.post<any>(url, JSON.stringify(fromObject), {headers:headers});
  }

  getListSongRequest(id:string) {
    let url = `${this.urlBase}/song/request/${id}`;
    return this.httpClient.get<any>(url);
  }
}

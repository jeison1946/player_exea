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
}

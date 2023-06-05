import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@media/environments';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  private urlBase = environment.apiUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  loginUser(fields: any) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    let body = new HttpParams({
      fromObject: {
        username: fields.email,
        password: fields.password,
      }
    });
    let url = `${this.urlBase}/login.json`;
    return this.httpClient.post<any>(url, body, {headers: headers});
  }

  getCustomerByIdPoint(id:number) {
    let url = `${this.urlBase}/points-of-sale/${id}.json`;
    return this.httpClient.get<any>(url);
  }
}

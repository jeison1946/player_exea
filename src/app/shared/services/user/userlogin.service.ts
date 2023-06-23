import { HttpClient } from '@angular/common/http';
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
    const fromObject: any = {
      "username": fields.email,
      "password": fields.password,
    }
    let url = `${this.urlBase}/user/login`;
    return this.httpClient.post<any>(url, JSON.stringify(fromObject), {headers: {'Content-Type':'application/json'}});
  }

  logoutUser(token:any) {
    const fromObject: any = {
      "X-AUTH-TOKEN": token,
    }
    let url = `${this.urlBase}/auth/logout`;
    return this.httpClient.post<any>(url, JSON.stringify(fromObject), {headers: {'Content-Type':'application/json'}});
  }

  getCustomerByIdPoint(id:number, token:string) {
    const headers = {'X-AUTH-TOKEN': token}
    let url = `${this.urlBase}/customer?point_of_sale=${id}`;
    return this.httpClient.get<any>(url, {headers: headers});
  }
}

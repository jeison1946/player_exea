import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserloginService } from 'src/app/shared/services/user/userlogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public form: FormGroup;  
  isNextDisabled=true

  passwordVisible: boolean = false;

  alerts:any;

  infoPage:any = false;

  displayLoader:boolean = false;

  constructor(private _formBuilder: FormBuilder, public userLogin: UserloginService, private router: Router) {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isNextDisabled = !this.form.valid;
    });
    this.getInfoPage();
  }

  setDataLogin(): void {
    this.userLogin.loginUser(this.form.value).subscribe(response => {
      this.alerts = {};
      this.userLogin.getCustomerByIdPoint(response.payload.user_data.punto_de_venta, response.payload.token).subscribe(res => {
        this.setSessionLogin(response.payload, res.payload);
      })
     
    },
    error => {
      this.alerts = {
        type: 'danger',
        message: 'El usuario o contraseña no es válido.'
      };
      setTimeout(() => {
        this.alerts = false;
      }, 2000);
    })
  }



  setSessionLogin(user: any, point_of_sale: any) {
    localStorage.setItem("token-session", btoa(user.token));
    localStorage.setItem("user-session", btoa(JSON.stringify(user.user_data)));
    localStorage.setItem("point-of-sale", btoa(JSON.stringify(point_of_sale)));
    this.router.navigateByUrl('/'); 
  }

  close() {
    this.alerts = {};
  }
  
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  getInfoPage() {
    this.displayLoader = true;
    this.userLogin.getInfoPage().subscribe(response => {
      if(response.payload.url_fondo && response.payload.color) {
        
        this.infoPage = {
          fondo: response.payload.url_fondo,
          color: response.payload.color
        }
      }
      this.displayLoader = false;
    })
  }
}

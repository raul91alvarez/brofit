import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webgym';
  public email: FormControl;
  public pass: FormControl;
  public check: FormControl;
  public isAuth: boolean = true;

  //Data from Cookies
  public user: string;
  public password: string;
 

  constructor(public router: Router, private as:AuthService, private cookie: CookieService){
    // used for showing data to DOM
    this.user = this.userCookies;
    this.password = this.passCookies;

    this.email = new FormControl('', [Validators.required, Validators.email]);
     this.pass = new FormControl('', [Validators.required]);
     this.check = new FormControl(true, [Validators.required]);
     
     
  }

  onSubmit() {
    this.as.loginEmailUser(this.email.value,this.pass.value);
    if (this.check.value) {
      this.cookie.set('user',`${this.email.value}`);
      this.cookie.set('pass',`${this.pass.value}`);
    } else{
      this.cookie.set('user','');
      this.cookie.set('pass','');
    }
    // console.log(this.cookie.getAll());  
  }

  

  getErrorMail() {
    if (this.email.hasError('required')) {
      return 'Este campo es requerido';
    }if (this.email.hasError('email')) {
      return  'La cuenta no es valida';
    }
    
  }

  getErrorPass(){
    if (this.pass.hasError('required')) {
      return 'Este campo es requerido';
    }
  }

  
  public get userCookies() : string {
    let user = this.cookie.get('user');
    if (user) {
      return user
    }else{ return ''}
  }
  public get passCookies() : string {
    let pass = this.cookie.get('pass');
    if (pass) {
      return pass
    }else{ return ''}
  }

  ngOnInit(): void {
    //verific user is login
    this.as.isAuth().subscribe(user => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
        }
    })
  }

  

  
}

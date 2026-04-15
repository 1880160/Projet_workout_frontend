import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../pages/sign-in/login-data';
import { catchError, config, of, throwError } from 'rxjs';
import { SignInData } from '../pages/sign-up/sign-in-data';
const route = 'users';
const domain = 'localhost'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http : HttpClient){}

  
  async login(loginData : LoginData){
    return this.http.post(`http://${domain}:3000/${route}/sign-in`,loginData)
  }
  
  async signUp(signUpData : SignInData){
    return this.http.post(`http://${domain}:3000/${route}/sign-up`,signUpData)
  }

  setSession(authResult : any){
    if (authResult.access_token){
      localStorage.setItem('jwtToken_access_token',authResult.access_token);
      const jwtToken = JSON.parse(atob(authResult.access_token.split('.')[1]))
      const date = new Date(0)
      date.setUTCSeconds(jwtToken.exp);
      localStorage.setItem('jwtToken_expire_date', date.toString());
      console.log(jwtToken)
    }
  }


  refreshLogin(){
    return this.http.get(`http://${domain}:3000/${route}/refresh-login`, {
      headers : {
        'Authorization' : 'Bearer'+`${this.getSession()}`,
      },
    }).subscribe(
      {
        next : this.setSession
      }
    )
  }

  getSession(){
    return localStorage.getItem('jwtToken_access_token');
  }

  getExpirationDate() : Date{
    const expirationString = localStorage.getItem('jwtToken_expire_date');
    const expirationDate : Date = new Date(Date.parse(expirationString ? expirationString : Date.now().toString()));
    return expirationDate;
  }

  logout(){
    localStorage.removeItem("jwtToken_access_token");
    localStorage.removeItem("jwtToken_expire_date");
  }

  isLoggedIn(){
    return this.getExpirationDate().getTime() > new Date().getTime();
  }


}


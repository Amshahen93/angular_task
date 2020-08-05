import { Injectable } from '@angular/core';
import { UserData } from '../models/userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  userData: UserData;

  constructor() {
    this.getTokenFromCookie();
  }

  setToken(token: string): void {
    document.cookie = `token_test = ${token};`;
    this.token = token;
  }

  getTokenFromCookie(): void {
    let cookieData = document.cookie;
    if (cookieData && cookieData.includes('token_test')) {
      cookieData = cookieData.split('token_test=')[1];
      if (cookieData) {
        cookieData = cookieData.split(';')[0];
        this.token = cookieData;
      }
    }
  }
  setUserData(form: UserData): void {
    this.userData = form;
  }
}

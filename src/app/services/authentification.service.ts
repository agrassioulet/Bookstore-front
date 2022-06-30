import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  url = environment.URL_BACKEND + '/user'
  
  constructor(
    private httpClient: HttpClient
  ) { }

  isUserLogin() {
    if (this.getToken()) {
      return true
    }
    return false
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  clearStorage() {
    localStorage.clear();
  }

  register(user: IUser) {
    return this.httpClient.post<{status: number, data: any}>(this.url + '/register', user)
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.url + '/login', {username: username, password: password})
  }


}
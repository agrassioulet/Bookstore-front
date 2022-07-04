import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.URL_BACKEND + '/user'

  constructor(
    private httpClient: HttpClient
  ) { }
  

  public getUserInfos() {
    return this.httpClient.get<{status: number, data: IUser}>(this.url + "/get-user-infos");
  }

  public saveUserData(user: IUser) {
    return this.httpClient.post<{status: number, data: IUser, message: string}>(this.url + "/save-user-data", user);
  }

}

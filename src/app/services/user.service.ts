import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.URL_BACKEND + '/user'

  constructor(
    private httpClient: HttpClient
  ) { }
  

  public getUserInfos() {
    return this.httpClient.get<{status: number, data: any}>(this.url + "/get-user-infos");
  }

}

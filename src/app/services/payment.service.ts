import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = environment.URL_BACKEND + ''


  constructor(
    private httpClient: HttpClient
  ) { }


  public createPayment(): Observable<void> {
    return this.httpClient.post<void>(this.url + '/create-checkout-session', {})
  }

}

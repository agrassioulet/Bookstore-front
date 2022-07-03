import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.URL_BACKEND + '/order'

  constructor(
    private httpClient: HttpClient
  ) { }

  saveDeliveryContact(contactDeliveryForm: any) {
    return this.httpClient.post<{ status: Number, data: any, message: string }>(this.url + '/save-delivery-contact', contactDeliveryForm);
  }

  getDeliveryContactInOrder() {
    return this.httpClient.get<{ status: Number, data: any, message: string }>(
      this.url + '/get-delivery-contact-in-order');
  }






}

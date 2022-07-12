import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = environment.URL_BACKEND + '/order'

  constructor(
    private httpClient: HttpClient
  ) { }

  saveDeliveryContact(contactDeliveryForm: any) {
    return this.httpClient.post<{ status: Number, data: any, message: string }>
    (this.url + '/save-delivery-contact', contactDeliveryForm);
  }

  getActiveOrder() {
    return this.httpClient.get<{ status: Number, data: IOrder, message: string }>
    (this.url + '/get-active-order');
  }

  validatePayment() {
    return this.httpClient.get<{ status: Number, data: any, message: string }>
    (this.url + '/validate-payment');
  }

  getOrderHistory() {
    return this.httpClient.get<{ status: Number, data: IOrder[], message: string }>
    (this.url + '/get-order-history');
  }


}

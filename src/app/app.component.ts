import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bookstore';
  paymentHandler: any = null;


  constructor(private httpClient: HttpClient) {

    render(
      {
        id: '#myPaypalButtons',
        currency: 'USD',
        value: '100.00',
        onApprove: (details) => { alert('Payment done') }
      })

  }
  ngOnInit(): void { }

}

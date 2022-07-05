import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentHandler: any = null;
  url = environment.URL_BACKEND + ''


  constructor(
    private httpClient: HttpClient
  ) {
    this.invokeStripe()
  }


  // public createPayment(): Observable<void> {
  //   return this.httpClient.post<void>(this.url + '/create-checkout-session', {})
  // }

  
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LHaYtICnI7jktLGrMPfrXvuOWhi6g1cQzzCrrCUOzkjRoQQJQbz9NBNg3jsOH4L1mSBnPG7crqbZxBJOFKtGIT400Qw6WyH8F',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: '',
      description: '',
      amount: amount * 100,
    });
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LHaYtICnI7jktLGrMPfrXvuOWhi6g1cQzzCrrCUOzkjRoQQJQbz9NBNg3jsOH4L1mSBnPG7crqbZxBJOFKtGIT400Qw6WyH8F',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}

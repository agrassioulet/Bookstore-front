import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
// import { render } from 'creditcardpayments/creditCardPayments'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bookstore';
  paymentHandler: any = null;


  constructor(private router: Router) {

    // render(
    //   {
    //     id: '#myPaypalButtons',
    //     currency: 'USD',
    //     value: '100.00',
    //     onApprove: (details) => { alert('Payment done') }
    //   })
  }
  
  
  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}

}

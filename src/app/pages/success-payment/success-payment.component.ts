import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit {

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.validatePayment()
  }


  validatePayment() {
    this.orderService.validatePayment().subscribe(result => {
      console.log(result)
    })
  }

}

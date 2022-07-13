import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss']
})
export class SuccessPaymentComponent implements OnInit {
  order: IOrder | null = null

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.validatePayment()
  }


  validatePayment() {
    this.orderService.validatePayment().subscribe(result => {
      console.log(result)
      if(result.status == 1) {
        this.order = result.data
      }
    })
  }

}

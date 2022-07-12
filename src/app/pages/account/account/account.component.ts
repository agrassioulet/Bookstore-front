import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  orders: IOrder[] = []

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.initOrderHistory()
  }


  initOrderHistory() {
    this.orderService.getOrderHistory().subscribe(result => {
      console.log(result)
      if(result.status ==1) {
        var orders = result.data
        this.orders = result.data
      }
    })
  }

  getTotal(order: IOrder) {
    var tmp = 0
    if(order.product_cart!= undefined) {
      order.product_cart.forEach(productCart => {
        tmp = tmp + productCart.quantity * productCart.product.price
      })
    }
    console.log('total ' , tmp)
    return tmp
  }

}

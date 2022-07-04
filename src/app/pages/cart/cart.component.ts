import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, OrderOperator } from 'src/app/models/order';
import { ICategory } from 'src/app/models/category';
import { IProductCart } from 'src/app/models/product_cart';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProductService } from 'src/app/services/product.service';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public order: IOrder = OrderOperator.initOrder();
  public subtotal: number = 0

  constructor(
    private productService: ProductService,
    private authentificationService: AuthentificationService,
    private router: Router,
    private reload: ReloadService
  ) { }

  ngOnInit(): void {
    console.log('ngoninit')
    this.getCart()
  }

  getCart() {
    if (this.authentificationService.isTokenSaved()) {
      this.productService.getCart().subscribe(result => {
        console.log('Panier :', result)
        this.order = result.data
        this.getSubtotal() 
      })
    }
  }

  getSubtotal() {
    var tmp = 0
    if(this.order.product_cart!= undefined) {
      this.order.product_cart.forEach(productCart => {
        tmp = tmp + productCart.quantity * productCart.product.price
      })
    }
    console.log('subtotal computed ' , tmp)
    this.subtotal = tmp
  }

  increaseQuantity(productCart: IProductCart) {
    productCart.quantity = productCart.quantity + 1
    this.productService.updateProductCart(productCart).subscribe(result => {
      // this.router.navigate(['/cart'])
      // window.location.reload();
      this.ngOnInit()
      this.reload.Refreshrequired.next()
    })
  }

  decreaseQuantity(productCart: IProductCart) {
    productCart.quantity = productCart.quantity - 1
    if(productCart.quantity == 0) {
      this.removeProductCart(productCart)
    }
    else {
      this.productService.updateProductCart(productCart).subscribe(result => {
        this.ngOnInit()
        this.reload.Refreshrequired.next()
      })
    }

  }

  removeProductCart(productCart: IProductCart) {
    this.productService.removeProductCart(productCart).subscribe(result => {
      // window.location.reload();
      this.ngOnInit()
      this.reload.Refreshrequired.next()
    })
  }

}

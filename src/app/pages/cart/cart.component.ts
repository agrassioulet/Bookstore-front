import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart, CartOperators } from 'src/app/models/cart';
import { ICategory } from 'src/app/models/category';
import { IProductCart } from 'src/app/models/product_cart';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart: ICart = CartOperators.initCart();

  constructor(
    private productService: ProductService,
    private authentificationService: AuthentificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    if (this.authentificationService.isTokenSaved()) {
      this.productService.getCart().subscribe(result => {
        console.log('cart :', result)
        this.cart = result.data
      })
    }
  }

  increaseQuantity(productCart: IProductCart) {
    productCart.quantity = productCart.quantity + 1
    this.productService.updateProductCart(productCart).subscribe(result => {
    })
  }

  decreaseQuantity(productCart: IProductCart) {
    productCart.quantity = productCart.quantity - 1
    this.productService.updateProductCart(productCart).subscribe(result => {
    })
  }

  removeProductCart(productCart: IProductCart) {
    this.productService.removeProductCart(productCart).subscribe(result => {
      console.log(result)
      this.router.navigate(['/cart']);
    })
  }

}

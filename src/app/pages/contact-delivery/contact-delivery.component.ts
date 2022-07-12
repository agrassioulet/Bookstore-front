import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder, OrderOperator } from 'src/app/models/order';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { OrderService } from 'src/app/_services/order.service';
import { ProductService } from 'src/app/_services/product.service';
import { PaymentService } from 'src/app/_services/payment.service';
import { IDeliveryContact, DeliveryContactOperator } from 'src/app/models/delivery_contact';
import { UserService } from 'src/app/_services/user.service';
import { IProductCart } from 'src/app/models/product_cart';

import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-contact-delivery',
  templateUrl: './contact-delivery.component.html',
  styleUrls: ['./contact-delivery.component.scss']
})
export class ContactDeliveryComponent implements OnInit {
  stripePromise = loadStripe(environment.STRIPE_KEY);

  total: Number = 0
  paymentHandler:any = null;
  order: IOrder = OrderOperator.initOrder();
  deliveryContact : IDeliveryContact = DeliveryContactOperator.initDeliveryContact()
  message: String = ''

  contactDeliveryForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    adress: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    saveDeliveryData: new FormControl(false,[])
  })

  constructor(
    private router : Router,
    private orderService: OrderService,
    private authentificationService: AuthentificationService,
    private productService: ProductService,
    private userService: UserService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.initData()
  }

  async checkout() {
    const stripe = await this.stripePromise;
    console.log("stripe", stripe)
    const error = stripe != null ? await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: 'price_1LKi94ICnI7jktLG57WB7rFQ',  quantity: 2 }],
      successUrl: window.location.origin + '/payment/success',
      cancelUrl: window.location.origin + '/payment/failure',
    }) : 'stripe not founded'
    console.log('redirectToCheckout', error)
    if (error) {
      console.log(error);
    }

  }

  initData() {
    this.orderService.getActiveOrder().subscribe(result => {
      console.log('getActiveOrder', result)
      if(result.status == 1) {
        this.order = result.data
        this.getTotal(this.order.product_cart ?? [])
         
        if(result.data.hasOwnProperty('delivery_contact')) {
          this.deliveryContact = result.data.delivery_contact ?? this.deliveryContact
        }
        else {
          this.userService.getUserInfos().subscribe(resultUser => {
            console.log('resultUser', resultUser)
            if(resultUser.status == 1 && resultUser.data.hasOwnProperty('delivery_contact')) {
              this.deliveryContact = resultUser.data.delivery_contact ?? this.deliveryContact
            }
          })
        }
      }
    })
  }

  getTotal(product_cart: IProductCart[]) {
    var tmp = 0
    if(product_cart!= undefined) {
      product_cart.forEach(productCart => {
        tmp = tmp + productCart.quantity * productCart.product.price
      })
    }
    console.log('subtotal computed ' , tmp)
    this.total = tmp
  }



  saveDeliveryContactAndPay() {
    console.log('contact Delivery Form', this.contactDeliveryForm.value)
    if (this.contactDeliveryForm.valid) {
      this.orderService.saveDeliveryContact(this.contactDeliveryForm.value).subscribe(result => {
        console.log(result)
        if (result.status == 1) {
          this.checkout()
        }
      })
    }
    else {
      this.message = 'Merci de renseigner tous les champs.'
    }
  }


}

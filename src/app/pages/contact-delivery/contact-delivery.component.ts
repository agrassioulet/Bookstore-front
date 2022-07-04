import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IOrder, OrderOperators } from 'src/app/models/order';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import Stripe from 'stripe';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-contact-delivery',
  templateUrl: './contact-delivery.component.html',
  styleUrls: ['./contact-delivery.component.scss']
})
export class ContactDeliveryComponent implements OnInit {

  paymentHandler:any = null;
  order: IOrder = OrderOperators.initCart();
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
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.invokeStripe()
    this.getDeliveryContactInOrder()
    this.getCart()
  }


  getDeliveryContactInOrder() {
    this.orderService.getDeliveryContactInOrder().subscribe(result => {
      console.log('getDeliveryContactInOrder', result)
      if(result.status == 1) {
        

      }
    })
  }

  saveDeliveryContact() {
    console.log('contact Delivery Form', this.contactDeliveryForm.value)
    // if (this.contactDeliveryForm.valid) {
    //   this.orderService.saveDeliveryContact(this.contactDeliveryForm.value).subscribe(result => {

    //     console.log(result)

    //     if (result.status == 1) {
    //       this.router.navigate(['/payment']);
    //     }

    //   })
    // }
    // else {
    //   this.message = 'Merci de renseigner tous les champs.'
    //   // this.state = enumState.ERROR_FORM
    // }
  }


  getCart() {
    if (this.authentificationService.isTokenSaved()) {
      this.productService.getCart().subscribe(result => {
        this.order = result.data
        this.order.product_cart
      })
    }
  }

  // makePayment() {
  //   this.paymentService.createPayment().subscribe(result => {
  //     console.log('makePayment', result)

  //   })
  // }


  // //////////// Méthodes de paiement stripe   //////////////////////
  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LHaYtICnI7jktLGrMPfrXvuOWhi6g1cQzzCrrCUOzkjRoQQJQbz9NBNg3jsOH4L1mSBnPG7crqbZxBJOFKtGIT400Qw6WyH8F',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LHaYtICnI7jktLGrMPfrXvuOWhi6g1cQzzCrrCUOzkjRoQQJQbz9NBNg3jsOH4L1mSBnPG7crqbZxBJOFKtGIT400Qw6WyH8F',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }





}

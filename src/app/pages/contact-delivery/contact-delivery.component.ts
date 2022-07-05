import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IOrder, OrderOperator } from 'src/app/models/order';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { PaymentService } from 'src/app/services/payment.service';
import { IDeliveryContact, DeliveryContactOperator } from 'src/app/models/delivery_contact';
import { UserService } from 'src/app/services/user.service';
import { IProductCart } from 'src/app/models/product_cart';

@Component({
  selector: 'app-contact-delivery',
  templateUrl: './contact-delivery.component.html',
  styleUrls: ['./contact-delivery.component.scss']
})
export class ContactDeliveryComponent implements OnInit {
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


  makePayment(amount: Number) {
    this.paymentService.makePayment(amount)
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



  saveDeliveryContact() {
    console.log('contact Delivery Form', this.contactDeliveryForm.value)
    if (this.contactDeliveryForm.valid) {
      this.makePayment(this.total)
      this.orderService.saveDeliveryContact(this.contactDeliveryForm.value).subscribe(result => {
        console.log(result)
        if (result.status == 1) {
          this.router.navigate(['/payment/success']);
        }
      })
    }
    else {
      this.message = 'Merci de renseigner tous les champs.'
    }
  }


}

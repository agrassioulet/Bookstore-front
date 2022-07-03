import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder, OrderOperators } from 'src/app/models/order';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-contact-delivery',
  templateUrl: './contact-delivery.component.html',
  styleUrls: ['./contact-delivery.component.scss']
})
export class ContactDeliveryComponent implements OnInit {

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

  })

  constructor(
    private router : Router,
    private orderService: OrderService,
    private authentificationService: AuthentificationService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
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

    if (this.contactDeliveryForm.valid) {
      this.orderService.saveDeliveryContact(this.contactDeliveryForm.value).subscribe(result => {

        console.log(result)

        if (result.status == 1) {
          this.router.navigate(['/payment']);
        }

      })
    }
    else {
      this.message = 'Merci de renseigner tous les champs.'
      // this.state = enumState.ERROR_FORM
    }

  }


  getCart() {
    if (this.authentificationService.isTokenSaved()) {
      this.productService.getCart().subscribe(result => {
        this.order = result.data
      })
    }
  }

}

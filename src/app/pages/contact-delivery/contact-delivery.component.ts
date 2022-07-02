import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-delivery',
  templateUrl: './contact-delivery.component.html',
  styleUrls: ['./contact-delivery.component.scss']
})
export class ContactDeliveryComponent implements OnInit {

  contactDeliveryForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

}

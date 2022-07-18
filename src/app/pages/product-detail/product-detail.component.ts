import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { IEvaluation } from 'src/app/models/evaluation';
import { IProduct, ProductOperators } from 'src/app/models/product';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  displayAuthWarning = false;
  commentPanel = false;
  product: IProduct = ProductOperators.initProduct();
  loaded = false;
  selectedNote = 0;
  textComment = '';
  comments: IEvaluation[] = []

  // inputForm = new FormGroup({
  //   titleUpdate : new FormControl(null, [])
  // })


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthentificationService
  ) { }


  ngOnInit(): void {

    var product_id = this.activatedRoute.snapshot.paramMap.get("product_id") ?? ''
    this.getComments(product_id)
    this.getProduct(product_id)

    this.displayAuthWarning = false;
    document.documentElement.scrollTop = 0

  }

  getProduct(product_id: string) {
    this.productService.getProductById(product_id).subscribe(result => {
      if (result.status == 1) {
        this.product = result.data
        this.loaded = true
      }
    })
  }

  getComments(product_id: string) {
    this.productService.getComments(product_id).subscribe(result => {
      console.log('getComments', result)
      if (result.status == 1) {
        this.comments = result.data
      }
    })
  }

  evaluate() {
    this.productService.addEvaluation(this.textComment, this.selectedNote, this.product._id).subscribe(result => {
      console.log(result)
    })
  }

  activateStars(event: any) {
    console.log('event ', event.target)
  }

  // updateTitle(product: IProduct) {
  //   console.log('input value', this.inputForm.value)
  // }


  addToCart(product: IProduct) {
    if (this.auth.isTokenSaved()) {
      var quantity = 1
      this.productService.addProductToCart(product, quantity).subscribe(result => {
        if (result.status == 1) {
          console.log(result)
          this.router.navigate(['']);
        }
      })
    }
    else {
      this.displayAuthWarning = true
    }


  }

}

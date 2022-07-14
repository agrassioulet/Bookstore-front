import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductOperators } from 'src/app/models/product';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  displayAuthWarning = false
  product: IProduct = ProductOperators.initProduct();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthentificationService
  ) { }

  ngOnInit(): void {
    this.displayAuthWarning = false;
    document.documentElement.scrollTop = 0
    var product_id = this.activatedRoute.snapshot.paramMap.get("product_id") ?? ''
    this.productService.getProductById(product_id).subscribe(result => {
      console.log('get product : ', result)

      if(result.status == 1) {
        this.product = result.data
      }

    })
  }


  addToCart(product: IProduct) {
    if(this.auth.isTokenSaved()) {
      var quantity = 1
      this.productService.addProductToCart(product, quantity).subscribe(result => {
        console.log('add product to cart : ', result)
        if(result.status == 1) {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ProductOperators } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct = ProductOperators.initProduct();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    var product_id = this.activatedRoute.snapshot.paramMap.get("product_id") ?? ''
    this.productService.getProductById(product_id).subscribe(result => {

      if(result.status == 1) {
        this.product = result.data
      }

    })
  }

  addToCart(product: IProduct) {
    var quantity = 1
    this.productService.addProductToCart(product, quantity).subscribe(result => {
      if(result.status == 1) {
        console.log(result)
        this.router.navigate(['']);
      }
      
    })

  }

}

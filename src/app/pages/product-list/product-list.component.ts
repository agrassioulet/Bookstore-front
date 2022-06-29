import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IProduct, ProductOperators } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = []
  categories: ICategory[] = []
  categoryCode: String = '';

  op = ProductOperators;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,

  ) {  }

  ngOnInit(): void {

    var code = this.activatedRoute.snapshot.paramMap.get("category_code")
    this.categoryCode = code ?? ''
    console.log('code category: ' + code)

    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data
      if(this.categoryCode != '') {
        console.log('on filter')
        this.products = this.products.filter(product => product.category.code == this.categoryCode)
      }
      console.log(this.products)
    })

    this.productService.getAllCategories().subscribe(result => {
      this.categories = result.data
      console.log(result)
    })

  }



}

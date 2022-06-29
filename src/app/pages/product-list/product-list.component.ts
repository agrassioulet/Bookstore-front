import { Component, OnInit } from '@angular/core';
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

  op = ProductOperators;
  // public productOperators!: ProductOperators;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data
      console.log(result)
    })

    this.productService.getAllCategories().subscribe(result => {
      this.categories = result.data
      console.log(result)
    })

  }



}

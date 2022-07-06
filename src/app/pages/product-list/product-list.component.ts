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
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  categories: ICategory[] = [];
  selectedCategory: ICategory | null = null;
  categoryCode: String = '';

  // Panel Variables
  languagePanel = true
  numberPagesPanel = true

  // Pagination
  p: number = 1


  enumLanguage = EnumLanguage
  languageFilter: EnumLanguage | null = null
  numberPagesFilter: number = 0

  op = ProductOperators;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  ) { }




  ngOnInit(): void {
    this.products = []

    var code = this.activatedRoute.snapshot.paramMap.get("category_code")
    this.categoryCode = code ?? ''
    console.log('code category: ' + code)
    this.getCategoryProductByCode(code)

    this.productService.getAllProducts().subscribe(result => {
      console.log('getAllProducts : ', result)
      this.products = result.data
      if (this.categoryCode != '') {
        console.log('on filter')
        this.products = this.products.filter(product => product.category.code == this.categoryCode)
      }
      this.filteredProducts = this.products
      console.log('this.filteredProducts', this.filteredProducts)
    })


    this.productService.getAllCategories().subscribe(result => {
      this.categories = result.data
      console.log(result)
    })
  }


  getCategoryProductByCode(code: any) {
    this.productService.getCategoryProductByCode(code).subscribe(result => {
      if (result.status == 1) {
        this.selectedCategory = result.data
        console.log('selected cat: ', this.selectedCategory)
      }
    })
  }


  filterLanguage(language: EnumLanguage) {
    this.filteredProducts = this.products.filter(product => {
      return product.language == language
    })
    this.languageFilter = language
  }

  eraseFilters() {
    this.filteredProducts = this.products
    this.languageFilter = null
  }

  changePage($event : any) {
    this.p = $event
    document.documentElement.scrollTop = 0
  }


}

enum EnumLanguage {
  ENGLISH = 'english',
  FRENCH = 'french',
  SPANISH = 'spanish'
}

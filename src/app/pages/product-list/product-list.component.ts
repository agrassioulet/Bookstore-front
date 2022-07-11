import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IProduct, ProductOperators } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  keyWord: string | null = null
  codeCategory: string | null = null 


  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  categories: ICategory[] = [];
  selectedCategory: ICategory | null = null;
  // categoryCode: string = '';

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
    var code = this.activatedRoute.snapshot.paramMap.get("category_code")
    var keyWord = this.activatedRoute.snapshot.paramMap.get("key_word")

    if (keyWord != null) {
      this.keyWord = keyWord
      this.initProductsByKeyWord(keyWord)
    }
    else if (code != null) {
      this.codeCategory = code
      this.getCategoryProductByCode(code)
      this.initProductsByCategory(code)
    }
    else {
      this.initProductsByKeyWord('')
    }
    this.initCategories()
  }

  initProductsByKeyWord(keyWord: string) {
    this.products = []
    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data
      this.products = this.products.filter(
        product => product.title.toLowerCase().includes(keyWord.toLowerCase()))
      this.filteredProducts = this.products
    })
  }

  initProductsByCategory(code: string) {
    this.products = []
    this.productService.getAllProducts().subscribe(result => {
      console.log('getAllProducts : ', result)
      this.products = result.data
      if (code != '') {
        console.log('on filter')
        this.products = this.products.filter(product => product.category.code == code)
      }
      this.filteredProducts = this.products
      console.log('this.filteredProducts', this.filteredProducts)
    })
  }


  initCategories() {
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

  changePage($event: any) {
    this.p = $event
    document.documentElement.scrollTop = 0
  }


}

enum EnumLanguage {
  ENGLISH = 'english',
  FRENCH = 'french',
  SPANISH = 'spanish'
}

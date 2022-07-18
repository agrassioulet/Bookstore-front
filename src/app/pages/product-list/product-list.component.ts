import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  filteredProductsByLanguage!: IProduct[];
  filteredProductsByPage!: IProduct[];

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
  pageFilter: number | null = null

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


  getNumberProductsByLanguage(language: string) {
    var cpt = 0
    this.products.forEach(product => {
      if (product.language == language) { cpt++ }
    })
    return cpt
  }

  getNumberProductsByPage(minNum: number, maxNum: number) {
    var cpt = 0
    this.products.forEach(product => {
      if (product.page <= maxNum && product.page >= minNum) { cpt++ }
    })
    return cpt
  }

  initProductsByKeyWord(keyWord: string) {
    this.products = []
    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data
      this.products = this.products.filter(
        product => product.title.toLowerCase().includes(keyWord.toLowerCase()))
      this.filteredProducts = this.products
      this.filteredProductsByLanguage = this.products
      this.filteredProductsByPage = this.products
    })
  }

  initProductsByCategory(code: string) {
    this.products = []
    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data
      if (code != '') {
        this.products = this.products.filter(product => product.category.code == code)
      }
      this.filteredProducts = this.products
      this.filteredProductsByLanguage = this.products
      this.filteredProductsByPage = this.products
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
      }
    })
  }

  filterPage(minNum: number, maxNum: number, state: number) {
    this.filteredProductsByPage = this.products.filter(product => {
      return (minNum <= product.page && product.page <= maxNum)
    })

    this.pageFilter = state
    this.joinFilteredProducts()
  }

  filterLanguage(language: EnumLanguage) {
    this.filteredProductsByLanguage = this.products.filter(product => {
      return product.language == language
    })

    this.languageFilter = language
    this.joinFilteredProducts()
  }

  eraseFilters() {
    this.filteredProducts = this.products
    this.filteredProductsByLanguage = this.products
    this.filteredProductsByPage = this.products
    this.languageFilter = null
    this.pageFilter = null
  }

  changePage($event: any) {
    this.p = $event
    document.documentElement.scrollTop = 0
  }

  joinFilteredProducts() {
    this.filteredProducts = this.filteredProductsByLanguage.filter(product => this.filteredProductsByPage.includes(product))
  }


}

enum EnumLanguage {
  ENGLISH = 'english',
  FRENCH = 'french',
  SPANISH = 'spanish'
}

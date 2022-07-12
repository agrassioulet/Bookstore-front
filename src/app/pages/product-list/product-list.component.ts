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
      console.log('init by null kyword')
      this.initProductsByKeyWord('')
    }
    console.log('this.products ', this.products)
    console.log('filteredProductsByPage ', this.filteredProductsByPage)
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
      console.log('getAllProducts : ', result)
      this.products = result.data
      if (code != '') {
        console.log('on filter')
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
        console.log('selected cat: ', this.selectedCategory)
      }
    })
  }

  filterPage(minNum: number, maxNum: number, state: number) {
    this.filteredProductsByPage = this.products.filter(product => {
      return (minNum <= product.page && product.page <= maxNum)
    })
    console.log('taille produits filtre page', this.filteredProductsByPage.length)
    console.log('taille produits filtre language', this.filteredProductsByLanguage.length)

    this.pageFilter = state
    this.joinFilteredProducts()
  }

  filterLanguage(language: EnumLanguage) {
    this.filteredProductsByLanguage = this.products.filter(product => {
      return product.language == language
    })
    console.log('taille produits filtre language', this.filteredProductsByLanguage.length)
    console.log('taille produits filtre page', this.filteredProductsByPage.length)

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

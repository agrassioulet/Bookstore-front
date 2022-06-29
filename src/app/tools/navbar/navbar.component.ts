import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categories: ICategory[] = []

  openSearch: boolean = true;
  openCategories: boolean = false;
  openUserPanel: boolean = false;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.productService.getAllCategories().subscribe(result => {
      this.categories = result.data
      console.log(result)
    })


  }

}

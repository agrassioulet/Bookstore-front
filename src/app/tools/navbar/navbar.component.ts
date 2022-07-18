import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IUser, UserOperators } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/_services/authentification.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReloadService } from 'src/app/_services/reload.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  keyWord = ''
  categories: ICategory[] = []
  openSearch: boolean = false;
  openCategories: boolean = false;
  openUserPanel: boolean = false;
  public isUserLogin = false
  public user: IUser = UserOperators.initUser()
  public quantityCart = 0

  constructor(
    private router: Router,
    private productService: ProductService,
    private auth: AuthentificationService,
    private userService: UserService,
    private reloadService: ReloadService
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.initUserInfos()
    this.initCategories()


    this.reloadService.Refreshrequired.subscribe(response => {
      this.initUserInfos();
    });

  }

  searchByKeyWord(event: any) {
    if (event.key === "Enter") {
      this.router.navigate(['/product-list/key-word/' + this.keyWord])
    }
  }

  logout() {
    this.auth.clearStorage()
    this.isUserLogin = false
    this.user = UserOperators.initUser()
    this.openUserPanel = false
    this.router.navigate(['/'])
  }

  initUserInfos() {
    if (this.auth.isTokenSaved()) {
      // Get user informations
      this.userService.getUserInfos().subscribe(result => {
        console.log(result)
        if (result.status == 1) {
          this.isUserLogin = true
          this.user = result.data
        }
      })

      // Get quantity in cart
      this.productService.getQuantityCart().subscribe(result => {
        if (result.status == 1) {
          this.quantityCart = result.data
        }
      })
    }
  }

  initCategories() {
    this.productService.getAllCategories().subscribe(result => {
      this.categories = result.data
      console.log(result)
    })
  }

}

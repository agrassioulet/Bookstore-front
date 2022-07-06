import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/category';
import { IUser, UserOperators } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProductService } from 'src/app/services/product.service';
import { ReloadService } from 'src/app/services/reload.service';
import { UserService } from 'src/app/services/user.service';

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
  public isUserLogin = false
  public user: IUser = UserOperators.initUser()
  public quantityCart = 0

  constructor(
    private router : Router,
    private productService: ProductService,
    private auth: AuthentificationService,
    private userService: UserService,
    private reloadService: ReloadService
  ) { }

  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.initUserInfos()
    this.initCategories()


    this.reloadService.Refreshrequired.subscribe(response=>{
      this.initUserInfos();
    });

  }

  logout() {
    this.auth.clearStorage()
    this.isUserLogin = false
    this.user = UserOperators.initUser()
    this.openUserPanel = false
  }

  initUserInfos() {
    if(this.auth.isTokenSaved()) {
      // Get user informations
      this.userService.getUserInfos().subscribe(result => {
        console.log(result)
        if(result.status == 1) {
          this.isUserLogin = true
          this.user = result.data
        }
      })

      // Get quantity in cart
      this.productService.getQuantityCart().subscribe(result => {
        if(result.status == 1) {
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

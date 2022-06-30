import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category';
import { IUser, UserOperators } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProductService } from 'src/app/services/product.service';
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

  constructor(
    private productService: ProductService,
    private auth: AuthentificationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(result => {
      this.categories = result.data
      console.log(result)
    })

    if(this.auth.isTokenSaved()) {
      this.userService.getUserInfos().subscribe(result => {
        console.log(result)
        if(result.status == 1) {
          this.isUserLogin = true
          this.user = result.data
        }

      })
    }
  }

  logout() {
    this.auth.clearStorage()
    this.isUserLogin = false
    this.user = UserOperators.initUser()
    this.openUserPanel = false
  }

}

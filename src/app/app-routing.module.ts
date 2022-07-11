import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountUpdateComponent } from './pages/account/account-update/account-update.component';
import { AccountComponent } from './pages/account/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactDeliveryComponent } from './pages/contact-delivery/contact-delivery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FailureComponent } from './pages/payment/failure/failure.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { AuthGuardService } from './_services/gards/auth-gard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-list/key-word/:key_word', component: ProductListComponent},
  {path: 'product-list/:category_code', component: ProductListComponent},
  {path: 'product-detail/:product_id', component: ProductDetailComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'contact-delivery', component: ContactDeliveryComponent, canActivate: [AuthGuardService]},
  {path: 'payment/success', component: SuccessComponent, canActivate: [AuthGuardService]},
  {path: 'payment/failure', component: FailureComponent, canActivate: [AuthGuardService]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
  {path: 'account-update', component: AccountUpdateComponent, canActivate: [AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

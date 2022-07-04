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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'product-list/:category_code', component: ProductListComponent},
  {path: 'product-detail/:product_id', component: ProductDetailComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contact-delivery', component: ContactDeliveryComponent},
  {path: 'payment/success', component: SuccessComponent},
  {path: 'payment/failure', component: FailureComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account-update', component: AccountUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

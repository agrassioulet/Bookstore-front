import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './tools/navbar/navbar.component';

import { MATERIAL } from './material';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './tools/footer/footer.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptorService } from './_services/interceptors/token-interceptor.service';
import { CartComponent } from './pages/cart/cart.component';
import { ContactDeliveryComponent } from './pages/contact-delivery/contact-delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { FailureComponent } from './pages/payment/failure/failure.component';
import { AccountComponent } from './pages/account/account/account.component';
import { AccountUpdateComponent } from './pages/account/account-update/account-update.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { SuccessPaymentComponent } from './pages/success-payment/success-payment.component';
import { FailurePaymentComponent } from './pages/failure-payment/failure-payment.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductDetailComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    ContactDeliveryComponent,
    PaymentComponent,
    SuccessComponent,
    FailureComponent,
    AccountComponent,
    AccountUpdateComponent,
    ProductAddComponent,
    SuccessPaymentComponent,
    FailurePaymentComponent
  ],
  imports: [
    NgxPayPalModule,
    HttpClientModule,
    BrowserModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MATERIAL,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

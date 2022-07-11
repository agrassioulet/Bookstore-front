import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category';
import { IContributor } from '../models/contributor';
import { IProduct } from '../models/product';
import { IProductCart } from '../models/product_cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.URL_BACKEND + '/product'
  constructor(private httpClient: HttpClient) {}

  public getAllProducts() {
    return this.httpClient.get<{status: number, data: IProduct[]}>(this.url + '/get-all-products');
  }

  public getAllCategories() {
    return this.httpClient.get<{status: number, data: ICategory[], message: string}>
    (this.url + '/get-all-categories');
  }

  public getAllContributors() {
    return this.httpClient.get<{status: number, data: IContributor[], message: string}>
    (this.url + '/get-all-contributors');
  }

  public getCategoryProductByCode(code: string) {
    return this.httpClient.post<{status: number, data: ICategory, message: string}>(this.url + '/get-category-by-code', 
    {code: code});
  }

  public getProductById(id: string): Observable<any> {
    return this.httpClient.get<{status: number, data: any, message: string}>(this.url + '/get-product-by-id' + '/' + id);
  }

  public getProductsByCategory(category: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/get-products-by-category' + '/' + category);
  }

  public createProduct(product: any): Observable<void> {
    return this.httpClient.post<void>(this.url, product)
  }


  // Methods for cart
  public addProductToCart(product: IProduct, quantity: number) {
    return this.httpClient.post<{status: number, data: any}>(this.url + '/add-product-to-cart', 
    { product: product, quantity: quantity })
  }

  public getCart() {
    return this.httpClient.get<{status: Number, data: any, message: string}>(this.url + '/get-cart');
  }

  public updateProductCart(productCart: IProductCart) {
    return this.httpClient.post<{status: number, data: any, message: string }>(this.url + '/update-product-cart', productCart);
  }

  public orderCart() {
    return this.httpClient.get<{status: Number, data: any}>(this.url + '/order-cart');
  }

  public getAllCarts() {
    return this.httpClient.get<{status: Number, data: any}>(this.url + '/get-all-sent-carts');
  }

  public getQuantityCart() {
    return this.httpClient.get<{status: Number, data: any, message: string}>(this.url + '/get-quantity-cart');
  }

  public removeProductCart(productCart: IProductCart) {
    return this.httpClient.post<{status: Number, data: any, message: string}>(this.url + '/remove-product-cart', productCart);
  }

}

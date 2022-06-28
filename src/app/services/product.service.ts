import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.URL_BACKEND + '/product'
  constructor(private httpClient: HttpClient) {
  }

  public getAllProducts() {
    return this.httpClient.get<IProduct[]>(this.url + '/get-all-products');
  }

  public getProductById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/get-product-by-id' + '/' + id);
  }

  public getProductsByCategory(category: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/get-products-by-category' + '/' + category);
  }

  public createProduct(product: any): Observable<void> {
    return this.httpClient.post<void>(this.url, product)
  }

}

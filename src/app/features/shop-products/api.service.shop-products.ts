import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ShopProduct } from 'src/app/models/shop-product-models';

@Injectable({
  providedIn: 'root',
})
export class ApiShopProductService {
  baseUrl = 'http://localhost:7015/api/ShopProduct';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getAllProducts(): Observable<ShopProduct[]> {
    return this.http.post<ShopProduct[]>(this.baseUrl + '/Filter', {});
  }

  saveProduct(shopProduct: ShopProduct): Observable<ShopProduct> {
    return this.http.post<ShopProduct>(this.baseUrl + '/Create', shopProduct);
  }
}

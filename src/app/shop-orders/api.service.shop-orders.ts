import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Person, User } from '../Models/models';
import { Observable } from 'rxjs';
import { ShopOrder, ShopProduct } from '../Models/shop-order';

@Injectable({
  providedIn: 'root',
})
export class ApiShopOrderService {
  baseUrl = 'http://localhost:7015/api';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getAllProducts(): Observable<ShopProduct[]> {
    return this.http.post<ShopProduct[]>(
      this.baseUrl + '/ShopProduct/Filter',
      {}
    );
  }

  getShopOrders(): Observable<ShopOrder[]> {
    return this.http.post<ShopOrder[]>(
      this.baseUrl + '/ShopOrder/Filter',
      {}
    );
  }

  saveOrder(shopOrder: ShopOrder): Observable<ShopOrder> {
    return this.http.post<ShopOrder>(
      this.baseUrl + '/ShopOrder/Create',
      shopOrder
    );
  }
}

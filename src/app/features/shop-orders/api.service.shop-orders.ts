import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ShopProduct, ShopOrder } from 'src/app/models/shop-order-models';

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

  markOrderReceived(id: number): Observable<ShopOrder> {
    return this.http.post<ShopOrder>(
      this.baseUrl + '/ShopOrder/MarkOrderReceived',
      {Id : id}
    );
  }

  saveOrder(shopOrder: ShopOrder): Observable<ShopOrder> {
    return this.http.post<ShopOrder>(
      this.baseUrl + '/ShopOrder/Create',
      shopOrder
    );
  }
}

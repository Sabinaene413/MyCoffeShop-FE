import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { SaleOrder } from 'src/app/features/sale-orders/sale-order-models';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';

@Injectable({
  providedIn: 'root',
})
export class ApiSaleOrderService {
  baseUrl = 'http://localhost:7015/api';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getAllProducts(): Observable<SaleProduct[]> {
    return this.http.post<SaleProduct[]>(
      this.baseUrl + '/SaleProduct/Filter',
      {}
    );
  }

  getSaleOrders(): Observable<SaleOrder[]> {
    return this.http.post<SaleOrder[]>(this.baseUrl + '/SaleOrder/Filter', {});
  }

  saveOrder(SaleOrder: SaleOrder): Observable<SaleOrder> {
    return this.http.post<SaleOrder>(
      this.baseUrl + '/SaleOrder/Create',
      SaleOrder
    );
  }
}

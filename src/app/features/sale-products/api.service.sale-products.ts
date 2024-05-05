import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';

@Injectable({
  providedIn: 'root',
})
export class ApiSaleProductService {
  baseUrl = 'http://localhost:7015/api/SaleProduct';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getAllProducts(): Observable<SaleProduct[]> {
    return this.http.post<SaleProduct[]>(this.baseUrl + '/Filter', {});
  }

  saveProduct(saleProduct: SaleProduct): Observable<SaleProduct> {
    return this.http.post<SaleProduct>(this.baseUrl + '/Create', saleProduct);
  }
}

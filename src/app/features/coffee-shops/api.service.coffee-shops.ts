import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { CoffeeShop } from './coffee-shop-models';

@Injectable({
  providedIn: 'root',
})
export class ApiCoffeeShopService {
  baseUrl = 'http://localhost:7015/api/CoffeeShop';
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  getAllCoffeeShops(): Observable<CoffeeShop[]> {
    return this.http.post<CoffeeShop[]>(this.baseUrl + '/Filter', {});
  }

  saveCoffeeShop(CoffeeShop: CoffeeShop): Observable<CoffeeShop> {
    return this.http.post<CoffeeShop>(this.baseUrl + '/Create', CoffeeShop, {
    });
  }
}

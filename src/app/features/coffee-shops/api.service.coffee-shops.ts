import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CoffeeShop } from './coffee-shop-models';
import { AbstractApiService } from 'src/app/shared/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCoffeeShopService extends AbstractApiService<CoffeeShop> {
  controllerUrl = 'CoffeeShop';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }
}

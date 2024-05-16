import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { AbstractApiService } from 'src/app/shared/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiShopProductService extends AbstractApiService<ShopProduct> {
  controllerUrl = 'ShopProduct';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }
}

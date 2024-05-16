import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';
import { AbstractApiService } from 'src/app/shared/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiSaleProductService extends AbstractApiService<SaleProduct> {
  controllerUrl = 'SaleProduct';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }
}

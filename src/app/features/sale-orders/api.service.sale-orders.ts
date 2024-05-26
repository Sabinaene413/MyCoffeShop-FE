import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractApiService } from 'src/app/shared/base-api.service';
import { SaleOrder } from './sale-order-models';

@Injectable({
  providedIn: 'root',
})
export class ApiSaleOrderService extends AbstractApiService<SaleOrder>  {
  controllerUrl = 'SaleOrder';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }
}

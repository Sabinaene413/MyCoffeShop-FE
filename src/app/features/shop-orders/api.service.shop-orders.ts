import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ShopOrder } from 'src/app/features/shop-orders/shop-order-models';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { AbstractApiService } from 'src/app/shared/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiShopOrderService extends AbstractApiService<ShopOrder> {
  controllerUrl = 'ShopOrder';
  constructor(http: HttpClient, jwt: JwtHelperService) {
    super(http, jwt);
    this.initUrl(this.controllerUrl);
  }

  markOrderReceived(id: number): Observable<ShopOrder> {
    return this.http.post<ShopOrder>(
      this.baseUrl + '/ShopOrder/MarkOrderReceived',
      { Id: id }
    );
  }
}

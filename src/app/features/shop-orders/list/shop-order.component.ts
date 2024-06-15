import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopOrder } from 'src/app/features/shop-orders/shop-order-models';
import { ApiShopOrderService } from '../api.service.shop-orders';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-shop-order-list',
  templateUrl: './shop-order.component.html',
})
export class ShopOrdersListComponent extends BaseListComponent<ShopOrder> implements OnInit{
  @ViewChild('grid') grid: any;
  constructor(api: ApiShopOrderService, public publicApi: ApiShopOrderService) {
    super (api)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  markOrderReceived(id: number): void {
    console.log('grid -> ', this.grid);
    //Trimitem comenzile către backend
    this.publicApi.markOrderReceived(id).subscribe({
      next: (res: ShopOrder) => {
        console.log(res);
      },
      error: (err: any) => console.log(err),
    });
  }
}

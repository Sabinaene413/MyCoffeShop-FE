import { Component } from '@angular/core';
import { ShopOrder } from 'src/app/Models/shop-order';
import { ApiShopOrderService } from '../api.service.shop-orders';

@Component({
  selector: 'app-shop-order-list',
  templateUrl: './shop-order.component.html',
})
export class ShopOrdersListComponent {
  shopOrders: ShopOrder[] = [];
  constructor(private api: ApiShopOrderService ) {}

  ngOnInit(): void {
    this.api.getShopOrders().subscribe({
      next: (res: ShopOrder[]) => {
        this.shopOrders = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

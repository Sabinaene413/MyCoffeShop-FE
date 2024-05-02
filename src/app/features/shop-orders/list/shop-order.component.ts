import { Component, ViewChild } from '@angular/core';
import { ShopOrder } from 'src/app/models/shop-order-models';
import { ApiShopOrderService } from '../api.service.shop-orders';

@Component({
  selector: 'app-shop-order-list',
  templateUrl: './shop-order.component.html',
})
export class ShopOrdersListComponent {
  @ViewChild('grid') grid: any;
  shopOrders: ShopOrder[] = [];
  constructor(private api: ApiShopOrderService) {}

  ngOnInit(): void {
    this.api.getShopOrders().subscribe({
      next: (res: ShopOrder[]) => {
        this.shopOrders = res;
      },
      error: (err: any) => console.log(err),
    });
  }

  markOrderReceived(id: number): void {
    console.log('grid -> ', this.grid);
    //Trimitem comenzile către backend
    this.api.markOrderReceived(id).subscribe({
      next: (res: ShopOrder) => {
        console.log(res);
      },
      error: (err: any) => console.log(err),
    });
  }
}

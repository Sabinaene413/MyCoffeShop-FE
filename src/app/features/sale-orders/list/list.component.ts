import { Component, ViewChild } from '@angular/core';
import { SaleOrder } from 'src/app/features/sale-orders/sale-order-models';
import { ApiSaleOrderService } from '../api.service.sale-orders';

@Component({
  selector: 'app-sale-order-list',
  templateUrl: './list.component.html',
})
export class SaleOrdersListComponent {
  @ViewChild('grid') grid: any;
  saleOrders: SaleOrder[] = [];
  constructor(private api: ApiSaleOrderService) {}

  ngOnInit(): void {
    this.api.getSaleOrders().subscribe({
      next: (res: SaleOrder[]) => {
        this.saleOrders = res;
      },
      error: (err: any) => console.log(err),
    });
  }

}

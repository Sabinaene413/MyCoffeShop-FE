import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleOrder } from 'src/app/features/sale-orders/sale-order-models';
import { ApiSaleOrderService } from '../api.service.sale-orders';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-sale-order-list',
  templateUrl: './list.component.html',
})
export class SaleOrdersListComponent  extends BaseListComponent<SaleOrder> implements OnInit {
  @ViewChild('grid') grid: any;

  constructor(api: ApiSaleOrderService) {super (api)}

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

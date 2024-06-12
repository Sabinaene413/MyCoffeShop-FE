import { Component, OnInit, ViewChild } from '@angular/core';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';
import { ApiSaleProductService } from '../api.service.sale-products';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-sale-product-list',
  templateUrl: './list.component.html',
})
export class SaleProductsListComponent extends BaseListComponent<SaleProduct> implements OnInit {
  @ViewChild('grid') grid: any;

  constructor(api: ApiSaleProductService) {super (api)}

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

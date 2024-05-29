import { Component, ViewChild, OnInit } from '@angular/core';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { ApiShopProductService } from '../api.service.shop-products';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-shop-product-list',
  templateUrl: './list.component.html',
})
export class ShopProductsListComponent extends BaseListComponent<ShopProduct> implements OnInit {
  @ViewChild('grid') grid: any;

  constructor(api: ApiShopProductService) {super (api)}

  override ngOnInit(): void {
    super.ngOnInit();
  }
}

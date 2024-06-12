import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiInventoryService } from '../api.service.inventories';
import { Inventory } from 'src/app/features/inventories/inventory-models';
import { ApiShopProductService } from '../../shop-products/api.service.shop-products';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-shop-order-list',
  templateUrl: './list.component.html',
})
export class InventoriesListComponent extends BaseListComponent<Inventory> implements OnInit {
  @ViewChild('grid') grid: any;
  shopProducts: { [key: number]: string } = {};

  constructor(api: ApiInventoryService,
    private apiProduct: ApiShopProductService ) {super (api)}

  override ngOnInit(): void {
    super.ngOnInit();

    this.apiProduct.getAll().subscribe({
      next: (res: ShopProduct[]) => {
        this.shopProducts = res.reduce((acc: any, curr) => {
          acc[curr.id ?? '0'] = curr.name;
          return acc;
        }, {});
      },
      error: (err: any) => console.log(err),
    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { ApiInventoryService } from '../api.service.inventories';
import { Inventory } from 'src/app/features/inventories/inventory-models';
import { ApiShopProductService } from '../../shop-products/api.service.shop-products';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';

@Component({
  selector: 'app-shop-order-list',
  templateUrl: './list.component.html',
})
export class InventoriesListComponent {
  @ViewChild('grid') grid: any;
  inventories: Inventory[] = [];
  shopProducts: { [key: number]: string } = {};
  constructor(
    private api: ApiInventoryService,
    private apiProduct: ApiShopProductService
  ) {}

  ngOnInit(): void {
    this.apiProduct.getAll().subscribe({
      next: (res: ShopProduct[]) => {
        this.shopProducts = res.reduce((acc: any, curr) => {
          acc[curr.id ?? '0'] = curr.name;
          return acc;
        }, {});
      },
      error: (err: any) => console.log(err),
    });
    this.api.getAll().subscribe({
      next: (res: Inventory[]) => {
        this.inventories = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

import { Component, ViewChild } from '@angular/core';
import { ApiInventoryService } from '../api.service.inventories';
import { Inventory } from 'src/app/models/inventory-models';
import { ApiShopProductService } from '../../shop-products/api.service.shop-products';
import { ShopProduct } from 'src/app/models/shop-order-models';

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
    this.apiProduct.getAllProducts().subscribe({
      next: (res: ShopProduct[]) => {
        this.shopProducts = res.reduce((acc: any, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});
      },
      error: (err: any) => console.log(err),
    });
    this.api.getInventories().subscribe({
      next: (res: Inventory[]) => {
        this.inventories = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

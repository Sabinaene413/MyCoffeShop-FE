import { Component, ViewChild } from '@angular/core';
import { ShopProduct } from 'src/app/features/shop-products/shop-product-models';
import { ApiShopProductService } from '../api.service.shop-products';

@Component({
  selector: 'app-shop-product-list',
  templateUrl: './list.component.html',
})
export class ShopProductsListComponent {
  @ViewChild('grid') grid: any;
  shopProducts: ShopProduct[] = [];
  constructor(private api: ApiShopProductService) {}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe({
      next: (res: ShopProduct[]) => {
        this.shopProducts = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

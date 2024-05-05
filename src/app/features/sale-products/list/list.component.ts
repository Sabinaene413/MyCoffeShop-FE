import { Component, ViewChild } from '@angular/core';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';
import { ApiSaleProductService } from '../api.service.sale-products';

@Component({
  selector: 'app-sale-product-list',
  templateUrl: './list.component.html',
})
export class SaleProductsListComponent {
  @ViewChild('grid') grid: any;
  saleProducts: SaleProduct[] = [];
  constructor(private api: ApiSaleProductService) {}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe({
      next: (res: SaleProduct[]) => {
        this.saleProducts = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

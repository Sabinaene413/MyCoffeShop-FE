import { Component, ViewChild } from '@angular/core';
import { CoffeeShop } from '../coffee-shop-models';
import { ApiCoffeeShopService } from '../api.service.coffee-shops';

@Component({
  selector: 'app-coffee-shop-list',
  templateUrl: './list.component.html',
})
export class CoffeeShopsListComponent {
  @ViewChild('grid') grid: any;
  coffeeShops: CoffeeShop[] = [];
  constructor(private api: ApiCoffeeShopService) {}

  ngOnInit(): void {
    this.api.getAllCoffeeShops().subscribe({
      next: (res: CoffeeShop[]) => {
        this.coffeeShops = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

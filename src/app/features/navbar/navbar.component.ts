import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiUserService } from '../../services/api.service';
import { NavigationEnd, Router } from '@angular/router';
import { ApiCoffeeShopService } from '../coffee-shops/api.service.coffee-shops';
import { CoffeeShop } from '../coffee-shops/coffee-shop-models';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  budget!: number;
  constructor(
    public api: ApiUserService,
    private router: Router,
    private apiCoffeeShop: ApiCoffeeShopService
  ) {}

  ngOnInit(): void {
    this.loadBudget();

    // Subscribe to router events to reload the budget on navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadBudget();
      });
  }

  loadBudget(): void {
    this.apiCoffeeShop
      .getById(this.api.getTokenUserInfo()?.locationId ?? 0)
      .subscribe((response: CoffeeShop) => {
        this.budget = response.budget;
      });
  }
  logOut() {
    this.api.deleteToken();
  }
}

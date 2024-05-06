import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { UsersComponent } from './features/users/users.component';
import { ShopOrderFormComponent } from './features/shop-orders/form/shop-order.component';
import { ShopOrdersListComponent } from './features/shop-orders/list/shop-order.component';
import { InventoriesListComponent } from './features/inventories/list/list.component';
import { InventoryFormComponent } from './features/inventories/form/form.component';
import { ShopProductFormComponent } from './features/shop-products/form/form.component';
import { ShopProductsListComponent } from './features/shop-products/list/list.component';
import { SaleProductsListComponent } from './features/sale-products/list/list.component';
import { SaleProductFormComponent } from './features/sale-products/form/form.component';
import { EmployeeFormComponent } from './features/employees/form/form.component';
import { EmployeesListComponent } from './features/employees/list/list.component';
import { SaleOrderFormComponent } from './features/sale-orders/form/form.component';
import { SaleOrdersListComponent } from './features/sale-orders/list/list.component';
import { CoffeeShopFormComponent } from './features/coffee-shops/form/form.component';
import { CoffeeShopsListComponent } from './features/coffee-shops/list/list.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'add-shop-order',
    component: ShopOrderFormComponent
  },
  {
    path: 'shop-orders',
    component: ShopOrdersListComponent
  },
  {
    path: 'inventories',
    component: InventoriesListComponent
  },
  {
    path: 'add-inventory',
    component: InventoryFormComponent
  },
  {
    path: 'add-shopProduct',
    component: ShopProductFormComponent
  },
  {
    path: 'shop-products',
    component: ShopProductsListComponent
  },
  {
    path: 'add-saleProduct',
    component: SaleProductFormComponent
  },
  {
    path: 'sale-products',
    component: SaleProductsListComponent
  },
  {
    path: 'add-employee',
    component: EmployeeFormComponent
  },
  {
    path: 'employees',
    component: EmployeesListComponent
  },
  {
    path: 'add-sale-order',
    component: SaleOrderFormComponent
  },
  {
    path: 'sale-orders',
    component: SaleOrdersListComponent
  },
  {
    path: 'add-coffeeShop',
    component: CoffeeShopFormComponent
  },
  {
    path: 'coffee-shops',
    component: CoffeeShopsListComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

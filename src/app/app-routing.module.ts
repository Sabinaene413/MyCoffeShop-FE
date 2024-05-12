import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/public/login/login.component';
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
import { StartPageComponent } from './features/public/start-page/start-page.component';
import { AuthGuard } from './services/guard';
import { NotFoundComponent } from './features/public/not-found/not-found.component';
import { RegisterComponent } from './features/public/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-shop-order',
    component: ShopOrderFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shop-orders',
    component: ShopOrdersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventories',
    component: InventoriesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-inventory',
    component: InventoryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-shopProduct',
    component: ShopProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shop-products',
    component: ShopProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-saleProduct',
    component: SaleProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sale-products',
    component: SaleProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-employee',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employees',
    component: EmployeesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-sale-order',
    component: SaleOrderFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sale-orders',
    component: SaleOrdersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-coffeeShop',
    component: CoffeeShopFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'coffee-shops',
    component: CoffeeShopsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'start',
    component: StartPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

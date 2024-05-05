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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

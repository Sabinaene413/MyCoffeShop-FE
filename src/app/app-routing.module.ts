import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import {  ShopOrderFormComponent } from './shop-orders/form/shop-order.component';
import { ShopOrdersListComponent } from './shop-orders/list/shop-order.component';


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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

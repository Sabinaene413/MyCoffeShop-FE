import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { LoginComponent } from './features/public/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ApiUserService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './features/users/users.component';
import { CommonModule } from '@angular/common';
import { ShopOrdersListComponent } from './features/shop-orders/list/shop-order.component';
import { ShopOrderFormComponent } from './features/shop-orders/form/form.component';
import { InventoriesListComponent } from './features/inventories/list/list.component';
import { InventoryFormComponent } from './features/inventories/form/form.component';
import { ShopProductFormComponent } from './features/shop-products/form/form.component';
import { ShopProductsListComponent } from './features/shop-products/list/list.component';
import { SaleProductFormComponent } from './features/sale-products/form/form.component';
import { SaleProductsListComponent } from './features/sale-products/list/list.component';
import { EmployeeFormComponent } from './features/employees/form/form.component';
import { EmployeesListComponent } from './features/employees/list/list.component';
import { SaleOrdersListComponent } from './features/sale-orders/list/list.component';
import { SaleOrderFormComponent } from './features/sale-orders/form/form.component';
import { CoffeeShopFormComponent } from './features/coffee-shops/form/form.component';
import { CoffeeShopsListComponent } from './features/coffee-shops/list/list.component';
import { StartPageComponent } from './features/public/start-page/start-page.component';
import { NotFoundComponent } from './features/public/not-found/not-found.component';
import { RegisterComponent } from './features/public/register/register.component';
import { TranscationsListComponent } from './features/transactions/list/list.component';
import { EmployeePaymentsListComponent } from './features/employee-payments/list/list.component';
import { EmployeePaymentFormComponent } from './features/employee-payments/form/form.component';
import { PaginationFilterComponent } from './shared/top-grid/top-grid';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UsersComponent,
    ShopOrderFormComponent,
    ShopOrdersListComponent,
    InventoriesListComponent,
    InventoryFormComponent,
    ShopProductFormComponent,
    ShopProductsListComponent,
    SaleProductFormComponent,
    SaleProductsListComponent,
    EmployeeFormComponent,
    EmployeesListComponent,
    SaleOrdersListComponent,
    SaleOrderFormComponent,
    CoffeeShopFormComponent,
    CoffeeShopsListComponent,
    StartPageComponent,
    RegisterComponent,
    NotFoundComponent,
    TranscationsListComponent,
    EmployeePaymentsListComponent,
    EmployeePaymentFormComponent,
    PaginationFilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:7015'],
      },
    }),
  ],
  providers: [[ApiUserService]],
  bootstrap: [AppComponent]
})
export class AppModule { }

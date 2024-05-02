import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { LoginComponent } from './features/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ApiUserService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './features/users/users.component';
import { CommonModule } from '@angular/common';
import { ShopOrdersListComponent } from './features/shop-orders/list/shop-order.component';
import { ShopOrderFormComponent } from './features/shop-orders/form/shop-order.component';
import { InventoriesListComponent } from './features/inventories/list/list.component';
import { InventoryFormComponent } from './features/inventories/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UsersComponent,
    ShopOrderFormComponent,
    ShopOrdersListComponent,
    InventoriesListComponent,
    InventoryFormComponent
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ShopOrderFormComponent } from './shop-orders/form/shop-order.component';
import { CommonModule } from '@angular/common';
import { ShopOrdersListComponent } from './shop-orders/list/shop-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UsersComponent,
    ShopOrderFormComponent,
    ShopOrdersListComponent
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
  providers: [[ApiService]],
  bootstrap: [AppComponent]
})
export class AppModule { }

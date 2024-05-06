import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiUserService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ApiCoffeeShopService } from '../coffee-shops/api.service.coffee-shops';
import { CoffeeShop } from '../coffee-shops/coffee-shop-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  responseMsg: string = '';
  coffeeShopOptions: CoffeeShop[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiUserService,
    private apiCoffeeShops: ApiCoffeeShopService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: fb.control('coffee_shop@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: fb.control('1234', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15),
      ]),
      locationId: fb.control(null),
    });

    this.apiCoffeeShops.getAllCoffeeShops().subscribe((res: any) => {
      this.coffeeShopOptions = res;
    });
  }

  login() {
    let loginInfo = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      locationId: this.loginForm.get('locationId')?.value,
    };

    this.api.login(loginInfo).subscribe({
      next: (res: any) => {
        if (res.toString() === 'Invalid')
          this.responseMsg = 'Invalid Credentials!';
        else {
          this.responseMsg = '';
          this.api.saveToken(res.accessToken);
        }
      },
      error: (err: any) => {
        console.log('Error: ');
        console.log(err);
      },
    });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}

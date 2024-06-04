import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCoffeeShopService } from '../api.service.coffee-shops';

@Component({
  selector: 'app-coffeeShop',
  templateUrl: './form.component.html',
})
export class CoffeeShopFormComponent implements OnInit {
  coffeeShopForm!: FormGroup;
  responseMsg: string = '';
  fileToUpload!: File | null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiCoffeeShopService,
    private router: Router
  ) {
    this.coffeeShopForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onChange($event: any) {
    if ($event?.target?.files !== undefined && $event?.target?.files !== null)
      this.fileToUpload = ($event?.target?.files as FileList).item(0);
  }

  addCoffeeShop() {
    let coffeeShopData: any = {
      name: this.coffeeShopForm.get('name')?.value,
    };

    this.api.add(coffeeShopData).subscribe((response) => {
      console.log('CoffeeShop added successfully:', response);
    });
  }
}

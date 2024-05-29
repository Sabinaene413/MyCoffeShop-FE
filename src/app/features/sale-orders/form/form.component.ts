import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSaleOrderService } from '../api.service.sale-orders';
import { SaleProduct } from 'src/app/features/sale-products/sale-product-models';
import { SaleOrder, SaleProductOrder } from '../sale-order-models';
import { BaseFormComponent } from 'src/app/shared/base-form';
import { ApiSaleProductService } from '../../sale-products/api.service.sale-products';
import { formatDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-saleOrder',
  templateUrl: './form.component.html',
})
export class SaleOrderFormComponent
  extends BaseFormComponent<SaleOrder>
  implements OnInit
{
  responseMsg: string = '';
  productForm!: FormGroup;
  productOptions: SaleProduct[] = [];

  constructor(
    public override api: ApiSaleOrderService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiProduct: ApiSaleProductService
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    this.apiProduct.getAll().subscribe((data: any) => {
      this.productOptions = data;
    });

    super.ngOnInit();
  }

  override initializeFormGroup(data: SaleOrder | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id],
      orderDate: [
        data?.orderDate === null || data?.orderDate === undefined
          ? new Date()
          : this.convertToDate(data.orderDate.toString()),
      ],
      cost: [data?.cost ?? ''],
    });

    this.productForm = this.formBuilder.group({
      saleOrderProducts: this.formBuilder.array([]),
    });
    if (data?.saleOrderProducts) {
      data.saleOrderProducts.forEach((product: SaleProductOrder) => {
        this.addProduct(product);
      });
      this.calculateTotalCost();
    }
  }

  get saleOrderProducts() {
    return this.productForm?.get('saleOrderProducts') as FormArray;
  }

  addProduct(productAdded: SaleProductOrder | undefined = undefined) {
    let product = this.formBuilder.group({
      id: [productAdded?.id ?? null],
      saleOrderId: [productAdded?.saleOrderId ?? null, Validators.required],
      saleProductId: [productAdded?.saleProductId ?? null, Validators.required],
      price: [productAdded?.price ?? null],
      quantity: [productAdded?.quantity ?? null, Validators.required],
      cost: [''],
    });
    
      // Set up a subscription to adjust price based on selected product
      product.get('saleProductId')?.valueChanges.subscribe((selectedProductId: any) => {
        const selectedProduct = this.productOptions.find(product => product.id == (selectedProductId as number));
        if (selectedProduct) {
          product.get('price')?.setValue(selectedProduct.price);
        }
      });

    this.saleOrderProducts.push(product);
  }

  deleteProduct(index: number) {
    this.saleOrderProducts.removeAt(index);
  }

  calculateTotalCost(): number {
    let totalCost = 0;
    this.saleOrderProducts?.value.forEach((product: any) => {
      if (product?.price !== null && product?.quantity !== null) {
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity);
        totalCost += price * quantity;
      }
    });
    return totalCost;
  }

  override afterSave() {
    this.router.navigate(['/sale-orders']);
  }

  override async mapToSaveData() {
    let mappedProducts: SaleProductOrder[] = this.saleOrderProducts.value.map(
      (product: any) => {
        return {
          id: product.id,
          saleOrderId: product.saleOrderId,
          saleProductId: product.saleProductId,
          price: product.price as number,
          quantity: product.quantity,
          cost: (product.price as number) * (product.quantity as number),
        };
      }
    );

    let orderData: SaleOrder = {
      id: this.formGroup.get('id')?.value,
      orderDate: this.formGroup.get('orderDate')?.value,
      cost: this.calculateTotalCost(),
      saleOrderProducts: mappedProducts,
    };

    this.saveData = orderData;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiEmployeePaymentService } from '../api.service.employee-payment';
import { BaseFormComponent } from 'src/app/shared/base-form';
import { EmployeePayment } from '../employee-payment-models';
import { ApiEmployeeService } from '../../employees/api.service.employees';
import { Employee } from '../../employees/employee-models';
import { formatDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-EmployeePayment',
  templateUrl: './form.component.html',
})
export class EmployeePaymentFormComponent
  extends BaseFormComponent<EmployeePayment>
  implements OnInit
{
  responseMsg: string = '';
  employeeOptions: Employee[] = [];

  constructor(
    public override api: ApiEmployeePaymentService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiEmployee: ApiEmployeeService
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    this.apiEmployee.getAll().subscribe((data: any) => {
      this.employeeOptions = data;
    });

    super.ngOnInit();
  }

  override initializeFormGroup(data: EmployeePayment | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id],
      employeeId: [data?.employeeId ?? '', [Validators.required]],
      amount: [data?.amount ?? '', [Validators.required]],
      employeePaymentDate: [data?.employeePaymentDate ?? new Date()],
    });
  }

  override afterSave() {
    this.router.navigate(['/employee-payments']);
  }
}

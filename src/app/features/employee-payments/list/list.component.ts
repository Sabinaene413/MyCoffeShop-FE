import { Component, ViewChild } from '@angular/core';
import { ApiEmployeePaymentService } from '../api.service.employee-payment';
import { EmployeePayment } from '../employee-payment-models';
import { ApiEmployeeService } from '../../employees/api.service.employees';
import { Employee } from '../../employees/employee-models';

@Component({
  selector: 'app-sale-product-list',
  templateUrl: './list.component.html',
})
export class EmployeePaymentsListComponent {
  @ViewChild('grid') grid: any;
  employeePayments: EmployeePayment[] = [];
  employeeDict: { [key: number]: string }[] = [];
  constructor(
    private api: ApiEmployeePaymentService,
    private apiEmployee: ApiEmployeeService
  ) {}

  ngOnInit(): void {
    this.apiEmployee.getAll().subscribe({
      next: (res: Employee[]) => {
         res.map((employee: Employee) => {
          this.employeeDict[employee.id ?? 0] =  employee.firstName + ' ' + employee.lastName
        });
      },
    });

    this.api.getAll().subscribe({
      next: (res: EmployeePayment[]) => {
        this.employeePayments = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

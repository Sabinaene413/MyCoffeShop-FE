import { Component, ViewChild } from '@angular/core';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
})
export class EmployeesListComponent {
  @ViewChild('grid') grid: any;
  employees: Employee[] = [];
  constructor(private api: ApiEmployeeService) {}

  ngOnInit(): void {
    this.api.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
      },
      error: (err: any) => console.log(err),
    });
  }
}

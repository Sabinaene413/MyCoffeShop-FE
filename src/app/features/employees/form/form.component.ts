import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';

@Component({
  selector: 'app-employee',
  templateUrl: './form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  responseMsg: string = '';
  fileToUpload!: File | null;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiEmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      file: [null],
      salaryBrut: [0],
      salaryNet: [0],
      taxes: [0],
    });
  }

  ngOnInit(): void {}

  onChange($event: any) {
    if ($event?.target?.files !== undefined && $event?.target?.files !== null)
      this.fileToUpload = ($event?.target?.files as FileList).item(0);
  }

  addEmployee() {
    let employeeData: any = {
      firstName: this.employeeForm.get('firstName')?.value,
      lastName: this.employeeForm.get('lastName')?.value,
      file: null,
      salaryBrut: this.employeeForm.get('salaryBrut')?.value,
      salaryNet: this.employeeForm.get('salaryNet')?.value,
      taxes: this.employeeForm.get('taxes')?.value,
    };

    if (this.fileToUpload !== null && this.fileToUpload !== undefined)
      employeeData.file = this.fileToUpload;

    const formData = new FormData();
    formData.append('FirstName', employeeData.firstName);
    formData.append('LastName', employeeData.lastName);
    formData.append('File', employeeData.file);
    formData.append('SalaryBrut', employeeData.salaryBrut);
    formData.append('SalaryNet', employeeData.salaryNet);
    formData.append('Taxes', employeeData.taxes);

    this.api.saveEmployee(formData).subscribe((response) => {
      console.log('Employee added successfully:', response);
    });
  }
}

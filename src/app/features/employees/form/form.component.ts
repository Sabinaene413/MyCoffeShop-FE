import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-employee',
  templateUrl: './form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  responseMsg: string = '';
  fileToUpload!: File | null;
  isEditMode: boolean = false;
  employeeId: number | undefined;
  employeePhoto: SafeUrl | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiEmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.employeeId = +id;
        this.isEditMode = true;
        // Fetch employee data and populate form for editing
        this.api.getById(this.employeeId).subscribe((employee) => {
          this.initializeFormGroup(employee);
          this.employeePhoto = this.getProfilePhoto(employee);
        });
      }
      else
      this.initializeFormGroup();
    });

  }

  initializeFormGroup(data: Employee | undefined = undefined)
  {
    this.employeeForm = this.formBuilder.group({
      id: [data?.id ?? '', [Validators.required]],
      firstName: [data?.firstName ?? '', [Validators.required]],
      lastName: [data?.lastName ?? '', [Validators.required]],
      file: [null],
      filePath: [data?.filePath ?? null],
      salaryBrut: [data?.salaryBrut ?? 0],
      salaryNet: [data?.salaryNet ?? 0],
      taxes: [data?.taxes ?? 0],
    });
  }
  onChange($event: any) {
    if ($event?.target?.files !== undefined && $event?.target?.files !== null)
      this.fileToUpload = ($event?.target?.files as FileList).item(0);
  }

  saveEmployee() {
    const employeeData: any = {
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
    formData.append('File', employeeData.file);
    formData.append('SalaryBrut', employeeData.salaryBrut);
    formData.append('SalaryNet', employeeData.salaryNet);
    formData.append('Taxes', employeeData.taxes);

    if (this.isEditMode && this.employeeId) {
      // Update existing employee
      formData.append('Id', this.employeeId.toString());
      this.api.updateEmployee(formData).subscribe((response) => {
        console.log('Employee updated successfully:', response);
        // Redirect to employee list page after update
        this.router.navigate(['/employees']);
      });
    } else {
      // Add new employee
      this.api.addEmployee(formData).subscribe((response) => {
        console.log('Employee added successfully:', response);
        // Redirect to employee list page after addition
        this.router.navigate(['/employees']);
      });
    }
  }

  getProfilePhoto(employee: Employee): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:${employee.profilePhotoContentType};base64,${employee.profilePhoto}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AbstractApiService } from 'src/app/shared/base-api.service';
import { BaseFormComponent } from 'src/app/shared/base-form';

@Component({
  selector: 'app-employee',
  templateUrl: './form.component.html',
})
export class EmployeeFormComponent
  extends BaseFormComponent<Employee>
  implements OnInit
{
  employeeForm!: FormGroup;
  responseMsg: string = '';
  fileToUpload!: File | null;
  employeePhoto: SafeUrl | undefined;

  constructor(
    public override api: ApiEmployeeService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    super(api, router, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override initializeFormGroup(data: Employee | undefined = undefined) {
    this.employeeForm = this.formBuilder.group({
      id: [data?.id ?? ''],
      firstName: [data?.firstName ?? '', [Validators.required]],
      lastName: [data?.lastName ?? '', [Validators.required]],
      file: [null],
      filePath: [data?.filePath ?? null],
      salaryBrut: [data?.salaryBrut ?? 0],
      salaryNet: [data?.salaryNet ?? 0],
      taxes: [data?.taxes ?? 0],
    });

    if (data) this.employeePhoto = this.getProfilePhoto(data);
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

    if (this.isEditMode && this.entityId) {
      // Update existing employee
      formData.append('Id', this.entityId.toString());
      this.api.updateFormData(formData).subscribe((response) => {
        console.log('Employee updated successfully:', response);
        // Redirect to employee list page after update
        this.router.navigate(['/employees']);
      });
    } else {
      // Add new employee
      this.api.addFormData(formData).subscribe((response) => {
        console.log('Employee added successfully:', response);
        // Redirect to employee list page after addition
        this.router.navigate(['/employees']);
      });
    }
  }

  getProfilePhoto(employee: Employee): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      `data:${employee.profilePhotoContentType};base64,${employee.profilePhoto}`
    );
  }
}

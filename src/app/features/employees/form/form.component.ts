import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BaseFormComponent } from 'src/app/shared/base-form';
import { RegisterEmployeeUser, User } from '../../users/users-models';
import { ApiUserService } from 'src/app/services/api.service';
import { Modal, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-employee',
  templateUrl: './form.component.html',
})
export class EmployeeFormComponent
  extends BaseFormComponent<Employee>
  implements OnInit,
  AfterViewInit
{
  responseMsg: string = '';
  userOptions: User[] = [];
  employeeTypeOptions: any = [
    { name: 'BARISTA', id: 1 },
    { name: 'ASISTENT_MANAGER', id: 2 },
  ];
  fileToUpload!: File | null;
  employeePhoto: SafeUrl | undefined;
  registerForm!: FormGroup;
  modal!: Modal;
  @ViewChild('staticModal') staticModal!: any;

  constructor(
    public override api: ApiEmployeeService,
    public override router: Router,
    public override route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private apiUser: ApiUserService
  ) {
    super(api, router, route);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
    const $targetEl = document.getElementById('static-modal');

    // options with default values
    const options: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      },
    };

    const instanceOptions = {
      id: 'static-modal',
      override: true,
    };
    if ($targetEl) {
      this.modal = new Modal($targetEl, options);
    } else {
      console.error('Modal element not found');
    }
  }, 1600); 

  }

  override ngOnInit(): void {
    this.apiUser.getAll().subscribe((data: any) => {
      this.userOptions = data;
    });


    super.ngOnInit();
  }


  override initializeFormGroup(data: Employee | undefined = undefined) {
    this.formGroup = this.formBuilder.group({
      id: [data?.id ?? ''],
      firstName: [data?.firstName ?? '', [Validators.required]],
      lastName: [data?.lastName ?? '', [Validators.required]],
      employeeTypeId: [data?.employeeTypeId ?? null, [Validators.required]],
      userId: [data?.userId ?? null],
      file: [null],
      filePath: [data?.filePath ?? null],
      salaryBrut: [data?.salaryBrut ?? 0],
      salaryNet: [data?.salaryNet ?? 0],
      taxes: [data?.taxes ?? 0],
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (data) this.employeePhoto = this.getProfilePhoto(data);
  }
  onChange($event: any) {
    if ($event?.target?.files !== undefined && $event?.target?.files !== null)
      this.fileToUpload = ($event?.target?.files as FileList).item(0);
  }

  saveNewUser() {
    const newUser: RegisterEmployeeUser = {
      email: this.registerForm.get('email')?.value,
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.apiUser.employeeRegister(newUser).subscribe((data: any) => {
      this.apiUser.getAll().subscribe((data: any) => {
        this.userOptions = data;
        this.formGroup.controls['userId'].setValue(data.id); //todo: nu merge nu se face refresh la valoare selectata in dropdown
      });
    });
  }

  saveEmployee() {
    const employeeData: any = {
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      employeeTypeId: this.formGroup.get('employeeTypeId')?.value,
      userId: this.formGroup.get('userId')?.value,
      file: null,
      salaryBrut: this.formGroup.get('salaryBrut')?.value,
      salaryNet: this.formGroup.get('salaryNet')?.value,
      taxes: this.formGroup.get('taxes')?.value,
    };

    if (this.fileToUpload !== null && this.fileToUpload !== undefined)
      employeeData.file = this.fileToUpload;

    const formData = new FormData();
    formData.append('FirstName', employeeData.firstName);
    formData.append('LastName', employeeData.lastName);
    formData.append('File', employeeData.file);
    formData.append('EmployeeTypeId', employeeData.employeeTypeId);
    formData.append('UserId', employeeData.userId);
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
  openModal () {
      this.modal.show();
  }
  closeModal() {
     this.modal.hide();
  }
}

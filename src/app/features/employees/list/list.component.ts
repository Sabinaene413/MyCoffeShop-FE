import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BaseListComponent } from 'src/app/shared/base-list';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
})
export class EmployeesListComponent extends BaseListComponent<Employee> implements OnInit{
  @ViewChild('grid') grid: any;
  constructor(api: ApiEmployeeService, private sanitizer: DomSanitizer) {
    super(api)
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
  
  getProfilePhoto(employee: Employee): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:${employee.profilePhotoContentType};base64,${employee.profilePhoto}`);
  }
}

import { Component, ViewChild } from '@angular/core';
import { Employee } from '../employee-models';
import { ApiEmployeeService } from '../api.service.employees';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
})
export class EmployeesListComponent {
  @ViewChild('grid') grid: any;
  employees: Employee[] = [];
  constructor(private api: ApiEmployeeService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.api.getAll().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
      },
      error: (err: any) => console.log(err),
    });
  }
  
  getProfilePhoto(employee: Employee): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:${employee.profilePhotoContentType};base64,${employee.profilePhoto}`);
  }
}

import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractApiService } from './base-api.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BaseFormComponent<DTO> implements OnInit {
  public data!: any;
  public saveData!: any;
  public formGroup!: FormGroup;
  public isEditMode: boolean | undefined;
  public entityId: number | undefined;
  constructor(
    public api: AbstractApiService<DTO>,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  convertToDate(dateTimeString: string): string {
    return dateTimeString.split('T')[0];
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.entityId = +id;
        this.isEditMode = true;

        this.api.getById(this.entityId).subscribe((data) => {
          console.log('Entity get successfully:', data);
          this.data = data;
          this.initializeFormGroup(this.data);
        });
      } else this.initializeFormGroup(undefined);
    });
  }

  async mapToSaveData<DTO>() {
    this.saveData = this.getFormData<DTO>(this.formGroup);
  }

  getFormData<DTO>(form: FormGroup): DTO {
    const formData: any = {};
    Object.keys(form.controls).forEach((key) => {
      formData[key] = form.get(key)?.value;
    });
    return formData as DTO;
  }

  public async save() {
    await this.mapToSaveData();
    if (this.entityId) {
      this.api.update(this.saveData).subscribe((response) => {
        this.afterSave();
        console.log('Entity added successfully:', response);
      });
    } else {
      this.api.add(this.saveData).subscribe((response) => {
        this.afterSave();
        console.log('Entity updated successfully:', response);
      });
    }
  }

  afterSave() {}

  initializeFormGroup(data: DTO | undefined): void {}

}

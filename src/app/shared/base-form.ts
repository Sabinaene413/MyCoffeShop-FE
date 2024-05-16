import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractApiService } from './base-api.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseFormComponent<DTO> implements OnInit {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.entityId = +id;
        this.isEditMode = true;
        // Fetch data and populate form for editing
        this.api.getById(this.entityId).subscribe((data) => {
          this.data = data;
          this.initializeFormGroup(this.data);
        });
      } else this.initializeFormGroup(undefined);
    });
  }

  mapToSaveData<DTO>() {
    this.saveData = this.getFormData<DTO>(this.formGroup);
  }

  getFormData<DTO>(form: FormGroup): DTO {
    const formData: any = {};
    Object.keys(form.controls).forEach((key) => {
      formData[key] = form.get(key)?.value;
    });
    return formData as DTO;
  }

  public save() {
    this.mapToSaveData();
    if (this.entityId) {
      this.api.update(this.saveData).subscribe((response) => {
        this.afterSave();
        console.log('Entity added successfully:', response);
      });
    } else {
      this.api.add(this.saveData).subscribe((response) => {
        this.afterSave();
        console.log('Entity added successfully:', response);
      });
    }
  }

  afterSave() {}

  abstract initializeFormGroup(data: DTO | undefined): void;
}

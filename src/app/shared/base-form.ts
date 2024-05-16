import { Component, Injectable, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AbstractApiService } from "./base-api.service";


@Injectable({
  providedIn: 'root',
})
export abstract class BaseFormComponent<DTO> implements OnInit {
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
            this.initializeFormGroup(data);
          });
        } else this.initializeFormGroup(undefined);
      });
    }
  
    public abstract initializeFormGroup(data: DTO | undefined): void;
  }
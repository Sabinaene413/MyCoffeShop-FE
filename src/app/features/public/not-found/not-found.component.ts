import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {}


}

// register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUserService } from 'src/app/services/api.service';
import { RegisterUser } from '../../users/users-models';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  responseMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiUserService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      locationName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    let newUser: RegisterUser = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      email: this.registerForm.get('email')?.value,
      locationName: this.registerForm.get('locationName')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.api.register(newUser).subscribe({
      next: (res: any) => {
        console.log('Register response: ', res);
        this.responseMsg = res;
        this.router.navigate(['/start']);
      },
      error: (err: any) => {
        console.log('Error: ');
        // Assuming response is stored in responseData variable
        let errorMessages: string = '';

        // Iterate over the errors object
        for (let key in err.error.errors) {
          if (err.error.errors.hasOwnProperty(key)) {
            errorMessages += ' ' + err.error.errors[key];
          }
        }
        this.responseMsg = errorMessages;
      },
    });
  }
}

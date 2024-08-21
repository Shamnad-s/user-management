import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    role: '',
    password: '',
  };
  submitted = false; // Track form submission
  emailError = '';
  constructor(private userService: UserService, private router: Router) {}

  onSubmit(signupForm: NgForm) {
    if (signupForm.invalid) {
      for (const control of Object.values(signupForm.controls)) {
        control.markAsTouched();
      }
      return;
    }
    // Set flag to true on submit

    // Check if form is valid
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.email &&
      this.user.mobileNo &&
      this.user.role &&
      this.user.password
    ) {
      this.userService.signup(this.user).subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            // Generic signup failure handling
          }
        },
        (error: any) => {
          if (error.status === 400 && error.error.message === 'Email already exists') {
            this.emailError = 'The email address is already in use.';
          } else {
            this.emailError = ''; // Clear the error if it's not related to email
          }
        }
      );
    }
  }
}

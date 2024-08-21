import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      for (const control of Object.values(loginForm.controls)) {
        control.markAsTouched();
      }
      return;
    }
    this.userService.login(this.credentials).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.userService.setRole(response.role);

          if (response.user.role === 'Admin') {
            this.authService.login(response.token);
            this.router.navigate(['/user-list']);
          } else {
            this.authService.login(response.token);
            this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage =
            'Login failed. Please check your credentials and try again.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    );
  }
}

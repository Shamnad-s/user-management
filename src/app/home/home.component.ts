import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout(); // Clear auth status
    this.router.navigate(['/login']); // Redirect to the login page
  }
}

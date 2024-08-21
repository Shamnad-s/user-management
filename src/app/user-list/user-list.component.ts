import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Use the User model for type checking

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        if (response.success) {
          this.users = response.users;
        } else {
          alert('Failed to load users');
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
        alert('Failed to load users');
      }
    );
  }
  blockUser(user: User) {
    this.userService.blockUser(user._id).subscribe((response: any) => {
      if (response.success) {
        alert(`${user.firstName} ${user.lastName} has been blocked.`);
        user.blocked = true; // Update the UI
      } else {
        alert('Failed to block user');
      }
    });
  }
  toggleBlockUser(user: User) {
    if (user.blocked) {
      this.userService.unblockUser(user._id).subscribe((response: any) => {
        if (response.success) {
          alert(`${user.firstName} ${user.lastName} has been unblocked.`);
          user.blocked = false; // Update the UI
        } else {
          alert('Failed to unblock user');
        }
      });
    } else {
      this.userService.blockUser(user._id).subscribe((response: any) => {
        if (response.success) {
          alert(`${user.firstName} ${user.lastName} has been blocked.`);
          user.blocked = true; // Update the UI
        } else {
          alert('Failed to block user');
        }
      });
    }
  }
  logout() {
    this.authService.logout(); // Clear auth status
    this.router.navigate(['/login']); // Redirect to the login page
  }
}

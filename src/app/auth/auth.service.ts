import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private user: any = null;
  constructor() {}

  private hasToken(): boolean {
    // Check if the token exists in local storage
    return !!localStorage.getItem('token');
  }

  // Observable to get the login status
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Method to log in and store token
  login(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  // Method to log out and clear token
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
  getUser() {
    return this.user; // Return the user details
  }
  // Check if the user is authenticated
  checkAuth(): boolean {
    return this.hasToken();
  }
}

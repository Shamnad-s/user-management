import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Your backend API URL
  private role: string = '';
  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  setRole(role: string) {
    this.role = role;
  }
  blockUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/block-user`, { userId });
  }
  unblockUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/unblock-user`, { userId });
  }
}

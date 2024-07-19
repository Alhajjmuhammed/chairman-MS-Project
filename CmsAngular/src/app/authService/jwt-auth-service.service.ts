import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class JwtAuthServiceService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
  }

  login(endpoint: string, user:any): Observable<any> {
    return this.http.post<{ token:string }>(`${this.baseUrl}/${endpoint}`, user); 
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    const isExpired = this.jwtHelper.isTokenExpired(token);
    console.log('Token expiration status:', isExpired);
    return !isExpired;
    
  }



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): { iss: string; role: string } | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return {
        iss: decodedToken.iss,
        role: decodedToken.role
      };
    }
    return null;
  }

  

  


}

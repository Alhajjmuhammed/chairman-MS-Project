import { Component } from '@angular/core';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'cms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentUser: { iss: string; role: string }| null = null;
  isLoggedIn!: boolean;
  constructor(private authService: JwtAuthServiceService, private router: Router){
    this.getCurrentUser();
    this.checkAuthentication();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
    console.log('Logout button clicked');
  }

  
  checkAuthentication() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

}

import { Component } from '@angular/core';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';

@Component({
  selector: 'cms-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: { iss: string; role: string } | null = null;
  constructor(private authService: JwtAuthServiceService) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
  
}

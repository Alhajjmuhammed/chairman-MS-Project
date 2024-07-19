import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users: any;
  token: string | null = null;
  getAuth!:boolean;

  constructor(private dataService: DataService, private authService: JwtAuthServiceService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllUsers();
  }

  getAllUsers() {

    if(this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.getAll('users', {headers})
      .subscribe(response => {
        this.users = response;
      },error => {
        console.error('Error fetching users:', error);
      });
    }else {
      console.error('No token available, unable to fetch users..');
    }

  }

  deleteUser(userId: number) {
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.delete('users', userId, { headers })
        .subscribe(
          () => {
            alert("delete Successs");
            this.getAllUsers();
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
    } else {
      console.error('No token available, unable to delete user.');
    }
  }



}

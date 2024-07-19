import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-chairmans',
  templateUrl: './chairmans.component.html',
  styleUrl: './chairmans.component.css'
})
export class ChairmansComponent  implements OnInit{

  chairmans: any;
  token: string | null = null;
  getAuth!:boolean;

  constructor(private dataService: DataService, private authService: JwtAuthServiceService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllChairmans();
  }

  getAllChairmans() {

    if(this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.getAll('chairman', {headers})
      .subscribe(response => {
        this.chairmans = response;
      },error => {
        console.error('Error fetching users:', error);
      });
    }else {
      console.error('No token available, unable to fetch users..');
    }

  }

  deleteChairman(userId: number) {
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.delete('chairman', userId, { headers })
        .subscribe(
          () => {
            alert("delete Successs");
            this.getAllChairmans();

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

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrl: './province.component.css'
})
export class ProvinceComponent implements OnInit{
  proviences: any;
  wards: any;
  token: string | null = null;
  getAuth!:boolean;

  constructor(private dataService: DataService, private authService: JwtAuthServiceService) {
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllProviences();
    this.getAllWards();
  }

  getAllProviences() {

    if(this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.getAll('province', {headers})
      .subscribe(response => {
        this.proviences = response;
      },error => {
        console.error('Error fetching provinces:', error);
      });
    }else {
      console.error('No token available, unable to fetch provinces..');
    }

  }

  getAllWards() {
    if(this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.getAll('wards', {headers})
      .subscribe(response => {
        this.wards = response;
      },error => {
        console.error('Error fetching wards:', error);
      });
    }else {
      console.error('No token available, unable to fetch wards..');
    }
  }

  deleteProvience(userId: number) {
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.delete('province', userId, { headers })
        .subscribe(
          () => {
            alert("delete Successs");
            this.getAllProviences();
          },
          (error) => {
            console.error('Error deleting provience:', error);
          }
        );
    } else {
      console.error('No token available, unable to delete provience.');
    }
  }

  deleteWard(userId: number) {
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.delete('wards', userId, { headers })
        .subscribe(
          () => {
            alert("delete Successs");
            this.getAllWards();
          },
          (error) => {
            console.error('Error deleting ward:', error);
          }
        );
    } else {
      console.error('No token available, unable to delete ward.');
    }
  }


}

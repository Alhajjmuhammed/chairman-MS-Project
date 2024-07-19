import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-chairman',
  templateUrl: './add-chairman.component.html',
  styleUrls: ['./add-chairman.component.css']
})
export class AddChairmanComponent implements OnInit {
  provinces: any;
  wards: any;
  myForm: FormGroup;
  token: string | null = null;
  provinceID:any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private authService: JwtAuthServiceService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      user: this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['chairman']
      }),
      fullname: ['', Validators.required],
      province: ['', Validators.required],
      ward: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllProvinces();
    this.getAllWards();
  }

  getAllProvinces() {
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.getAll('province', { headers })
        .subscribe(
          response => {
            this.provinces = response;
          },
          error => {
            console.error('Error fetching provinces:', error);
          }
        );
    } else {
      console.error('No token available, unable to fetch provinces.');
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
  
  getProvinceID(){
    console.log(this.provinceID);
  }

  onProvinceChange(): void {
    console.log('hello');
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      const user = this.myForm.value;
      if (this.token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.provinceID = this.myForm.value.province;
        console.log(this.provinceID);
        // this.dataService.create('chairman', user, { headers })
        //   .subscribe(
        //     response => {
        //       console.log('Chairman created successfully:', response);
        //       alert('User created successfully!!!');
        //       this.router.navigate(['/chairmans']);
        //     },
        //     error => {
        //       console.error('Error creating chairman:', error);
        //     }
        //   );
      } else {
        console.error('No token available, unable to create chairman.');
      }
    }
  }
}

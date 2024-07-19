import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-citizen',
  templateUrl: './add-citizen.component.html',
  styleUrl: './add-citizen.component.css'
})
export class AddCitizenComponent implements OnInit{
  chairmans: any;
  wards: any;
  myForm: FormGroup;
  token: string | null = null;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private authService: JwtAuthServiceService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      
      citizenID: ['', Validators.required],
      fullname: ['', Validators.required],
      ward: ['', Validators.required],
      houseNo: ['', Validators.required],
      dob: ['', Validators.required],
      status: ['present'],
      chairman: this.fb.group({
        id: ['1'],
      })
    });
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllWards();
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
  
  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      const user = this.myForm.value;
      if (this.token) {
        // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        // this.provinceID = this.myForm.value.province;
        // console.log(this.provinceID);
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

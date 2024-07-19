import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-ward',
  templateUrl: './add-ward.component.html',
  styleUrl: './add-ward.component.css'
})
export class AddWardComponent implements OnInit{
  provinces: any;
  myForm!: FormGroup;
  token: string | null = null;
  getAuth!:boolean;

  constructor(private fb: FormBuilder, 
    private dataService: DataService, 
    private router: Router,
    private authService: JwtAuthServiceService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllProviences();
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      province: this.fb.group({
        id: ['', Validators.required]
      })
    });
      
  }

  getAllProviences() {
    if (this.token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      this.dataService.getAll('province', { headers })
        .subscribe(
          response => {
            this.provinces = response;
            console.log(this.provinces);
          },
          error => {
            console.error('Error fetching provinces:', error);
          }
        );
    } else {
      console.error('No token available, unable to fetch provinces..');
    }
  }

  onSubmit() {
    if(this.myForm.valid){
      const ward = this.myForm.value;
      if(this.token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.dataService.create('wards', ward, {headers})
        .subscribe(response => { 
          console.log('Ward created successfully:', response);
          alert("Ward created successfully!!!");
          this.router.navigate(['/provinces']);

        }, error => {
          console.error('Error creating ward:', error);
        });
      }else {
        console.error('No token available, unable to fetch ward.');
      }
    }
  }



}

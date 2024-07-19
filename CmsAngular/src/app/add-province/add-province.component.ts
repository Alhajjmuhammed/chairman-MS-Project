import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'cms-add-province',
  templateUrl: './add-province.component.html',
  styleUrl: './add-province.component.css'
})
export class AddProvinceComponent implements OnInit {

  myForm!: FormGroup;
  token: string | null = null;

  constructor(private dataService: DataService, 
    private fb: FormBuilder, 
    private authService: JwtAuthServiceService,
    private router: Router) {}

  ngOnInit(): void {

    this.token = this.authService.getToken();
    this.myForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if(this.myForm.valid){
      const province = this.myForm.value;
      if(this.token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.dataService.create('province', province, {headers})
        .subscribe(response => { 
          console.log('User created successfully:', response);
          alert("Province created successfully!!!");
          this.router.navigate(['/provinces']);

        }, error => {
          console.error('Error creating province:', error);
        });
      }else {
        console.error('No token available, unable to fetch province.');
      }
    }
  }
  
}

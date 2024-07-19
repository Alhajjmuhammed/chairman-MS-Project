import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  myForm!: FormGroup;
  token: string | null = null;

  constructor(private dataService: DataService, 
    private fb: FormBuilder, 
    private authService: JwtAuthServiceService,
    private router: Router) {}

  ngOnInit(): void {

    this.token = this.authService.getToken();
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['admin']
    });

  }

  onSubmit() {
    if(this.myForm.valid){
      console.log(this.myForm.value);
      const user = this.myForm.value;
      if(this.token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.dataService.create('users', user, {headers})
        .subscribe(response => { 
          console.log('User created successfully:', response);
          alert("User created successfully!!!");
          this.router.navigate(['/users']);

        }, error => {
          console.error('Error creating user:', error);
        });
      }else {
        console.error('No token available, unable to fetch users.');
      }
    }
  }

  
}

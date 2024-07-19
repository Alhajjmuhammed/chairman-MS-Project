import { JwtAuthServiceService } from './../authService/jwt-auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{

  items: any;
  myForm!: FormGroup;
  token: string | null = null;
  getAuth!:boolean;

  constructor(private dataService: DataService, 
    private fb: FormBuilder, 
    private authService: JwtAuthServiceService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.getAllItems();
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['admin']
    });
    this.getAuth = this.authService.isAuthenticated();
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
        }, error => {
          console.error('Error creating user:', error);
        });
      }else {
        console.error('No token available, unable to fetch users.');
      }
    }
  }

  getAllItems(): void {

      if (this.token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
        this.dataService.getAll('users', { headers }).subscribe(
          (data) => {
            this.items = data;
          },
          (error) => {
            console.error('Error fetching users:', error);
          }
        );
      } else {
        console.error('No token available, unable to fetch users..');
      }
  }

  
  



}

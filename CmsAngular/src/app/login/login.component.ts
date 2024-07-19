import { JwtAuthServiceService } from './../authService/jwt-auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{ 
  loginInfo!: FormGroup;
  invalidLogin!: string;
  constructor(private fb: FormBuilder,  
    private loginService: JwtAuthServiceService, 
    private router: Router) {}

  ngOnInit(): void {
      this.loginInfo = this.fb.group({
        username: ['', Validators.required],
        password:['', Validators.required]
      });
  }

  onLogin() {
    console.log(this.loginInfo.value);
    if(this.loginInfo.valid) {
      this.loginService.login("login", this.loginInfo.value)
      .subscribe(
        (response) => {
          console.log(response.token);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.invalidLogin = 'Invalid username or password';
        }
      );
    }

  }


}


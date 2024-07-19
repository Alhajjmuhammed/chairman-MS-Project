import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { JwtAuthServiceService } from '../authService/jwt-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: JwtAuthServiceService, private router: Router) { }

  canActivate() {
    if(this.authService.isAuthenticated()) return true;
    this.router.navigate(['']);
    return false;
  }

}

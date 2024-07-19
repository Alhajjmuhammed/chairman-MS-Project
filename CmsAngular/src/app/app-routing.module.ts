import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { PostsComponent } from './posts/posts.component';
import { MigrantsComponent } from './migrants/migrants.component';
import { CitizensComponent } from './citizens/citizens.component';
import { ProvinceComponent } from './province/province.component';
import { ChairmansComponent } from './chairmans/chairmans.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddChairmanComponent } from './add-chairman/add-chairman.component';
import { AddProvinceComponent } from './add-province/add-province.component';
import { AddWardComponent } from './add-ward/add-ward.component';
import { AddCitizenComponent } from './add-citizen/add-citizen.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'post', component: PostsComponent},
  {path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users' , component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'chairmans' , component: ChairmansComponent, canActivate: [AuthGuard]},
  {path: 'provinces' , component: ProvinceComponent, canActivate: [AuthGuard]},
  {path: 'citizens' , component: CitizensComponent, canActivate: [AuthGuard]},
  {path: 'migrants' , component: MigrantsComponent, canActivate: [AuthGuard]},
  {path: 'add-user' , component: AddUserComponent, canActivate: [AuthGuard]},
  {path: 'add-chairman' , component: AddChairmanComponent, canActivate: [AuthGuard]},
  {path: 'add-province' , component: AddProvinceComponent, canActivate: [AuthGuard]},
  {path: 'add-ward' , component: AddWardComponent, canActivate: [AuthGuard]},
  {path: 'add-citizen' , component: AddCitizenComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Correct imports
import { DataService } from './services/data.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { JwtAuthServiceService } from './authService/jwt-auth-service.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { ChairmansComponent } from './chairmans/chairmans.component';
import { ProvinceComponent } from './province/province.component';
import { CitizensComponent } from './citizens/citizens.component';
import { MigrantsComponent } from './migrants/migrants.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddChairmanComponent } from './add-chairman/add-chairman.component';
import { AddWardComponent } from './add-ward/add-ward.component';
import { AddProvinceComponent } from './add-province/add-province.component';
import { AddCitizenComponent } from './add-citizen/add-citizen.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    UsersComponent,
    ChairmansComponent,
    ProvinceComponent,
    CitizensComponent,
    MigrantsComponent,
    AddUserComponent,
    AddChairmanComponent,
    AddWardComponent,
    AddProvinceComponent,
    AddCitizenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['*'],
        disallowedRoutes:[]
      }
    })
  ],
  providers: [
    AuthGuard,
    JwtHelperService,
    DataService,
    JwtAuthServiceService,
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

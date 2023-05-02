import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    WelcomePageComponent,
    SignUpComponent,
  ],
  providers:[
    AuthService
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    LoginComponent,
    WelcomePageComponent,
    SignUpComponent,
  ]
})
export class AuthModule { }

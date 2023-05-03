import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, WelcomePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [LoginComponent, SignUpComponent, WelcomePageComponent]
})
export class AuthModule { }

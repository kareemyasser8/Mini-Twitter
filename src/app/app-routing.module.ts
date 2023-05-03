import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TweetWrapperComponent } from './tweet-wrapper/tweet-wrapper.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome/login', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignUpComponent },
    ]
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'feed', component: HomeWrapperComponent },
      { path: 'profile/:username', component: ProfilePageComponent },
      { path: 'tweet/:id', component: TweetWrapperComponent },

      // { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
      { path: 'notifications', component: NotificationsPageComponent, canActivate: [AuthGuard] },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

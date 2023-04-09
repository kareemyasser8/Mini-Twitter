import { TweetWrapperComponent } from './tweet-wrapper/tweet-wrapper.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { CreateReplyComponent } from './create-reply/create-reply.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';

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
  { path: 'home', component: HomeComponent,
    children:[
      {path: 'feed', component: HomeWrapperComponent},
      {path: ':author/:id', component: TweetWrapperComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'notifications', component: NotificationsPageComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

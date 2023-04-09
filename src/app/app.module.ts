import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { CreateReplyComponent } from './create-reply/create-reply.component';
import { CreateTweetComponent } from './create-tweet/create-tweet.component';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TweetBodyComponent } from './tweet-body/tweet-body.component';
import { TweetOptionsComponent } from './tweet-options/tweet-options.component';
import { TweetWrapperComponent } from './tweet-wrapper/tweet-wrapper.component';
import { TweetsService } from './tweets.service';
import { TweetsComponent } from './tweets/tweets.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomePageComponent,
    SignUpComponent,
    HomeComponent,
    NavBarComponent,
    SearchBarComponent,
    HomeWrapperComponent,
    CreateTweetComponent,
    TweetsComponent,
    CreateReplyComponent,
    TweetBodyComponent,
    TweetOptionsComponent,
    TweetWrapperComponent,
    EditTweetComponent,
    ProfilePageComponent,
    ProfileCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgPipesModule,

  ],
  providers: [TweetsService, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

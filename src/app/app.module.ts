import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { CreateTweetComponent } from './create-tweet/create-tweet.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetsService } from './tweets.service';
import { CreateReplyComponent } from './create-reply/create-reply.component';
import { TweetBodyComponent } from './tweet-body/tweet-body.component';
import { TweetOptionsComponent } from './tweet-options/tweet-options.component';
import { NgPipesModule } from 'ngx-pipes';
import { TweetWrapperComponent } from './tweet-wrapper/tweet-wrapper.component';
import { HttpClientModule } from '@angular/common/http';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component'
import { AuthService } from './auth.service';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgPipesModule,

  ],
  providers: [TweetsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

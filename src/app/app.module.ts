import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { EmptyTweetsComponent } from './empty-tweets/empty-tweets.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ErrorInterceptor } from './error.interceptor';
import { GuestInstructionsComponent } from './guest-instructions/guest-instructions.component';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { NotificationTimeAgoPipe } from './notification-time-ago.pipe';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TweetDetailsComponent } from './tweet-details/tweet-details.component';
import { TweetOptionsComponent } from './tweet-options/tweet-options.component';
import { TweetWrapperComponent } from './tweet-wrapper/tweet-wrapper.component';
import { TweetModule } from './tweet/tweet.module';
import { TweetsService } from './tweets.service';
import { TweetsComponent } from './tweets/tweets.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


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
    NotificationCardComponent,
    NotificationTimeAgoPipe,
    ProfileCardComponent,
    ErrorDialogComponent,

    TweetOptionsComponent,
    TweetWrapperComponent,
    EditTweetComponent,
    EmptyTweetsComponent,
    TweetDetailsComponent,
    TweetsComponent,


    NotificationsPageComponent,
    ProfilePageComponent,
    GuestInstructionsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgPipesModule,

    TweetModule,
    // NotificationModule

  ],
  providers: [TweetsService, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ErrorDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

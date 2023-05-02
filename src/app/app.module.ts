import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { AuthModule } from './auth/auth.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { ErrorInterceptor } from './error.interceptor';
import { HomeWrapperComponent } from './home-wrapper/home-wrapper.component';
import { NotificationModule } from './notification/notification.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SharedModule } from './shared/shared.module';
import { TweetModule } from './tweet/tweet.module';
import { TweetsService } from './tweets.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeWrapperComponent,
    ProfileCardComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgPipesModule,
    SharedModule,
    TweetModule,
    AuthModule,
    NotificationModule,

  ],
  providers: [TweetsService, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ErrorDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

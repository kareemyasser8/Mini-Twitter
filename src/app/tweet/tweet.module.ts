import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReplyComponent } from '../create-reply/create-reply.component';
import { CreateTweetComponent } from '../create-tweet/create-tweet.component';
import { TweetBodyComponent } from '../tweet-body/tweet-body.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TweetsService } from '../tweets.service';
import { NotificationsService } from '../notifications.service';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    CreateReplyComponent,
    CreateTweetComponent,
    TweetBodyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,

  ],
  providers:[
    AuthService,
    TweetsService,
    NotificationsService,

  ],
  exports:[
    CreateReplyComponent,
    CreateTweetComponent,
    TweetBodyComponent,
  ]
})
export class TweetModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { AuthService } from '../auth.service';
import { CreateReplyComponent } from '../create-reply/create-reply.component';
import { CreateTweetComponent } from '../create-tweet/create-tweet.component';
import { EditTweetComponent } from '../edit-tweet/edit-tweet.component';
import { NotificationsService } from '../notifications.service';
import { SharedModule } from '../shared/shared.module';
import { TweetBodyComponent } from '../tweet-body/tweet-body.component';
import { TweetDetailsComponent } from '../tweet-details/tweet-details.component';
import { TweetOptionsComponent } from '../tweet-options/tweet-options.component';
import { TweetWrapperComponent } from '../tweet-wrapper/tweet-wrapper.component';
import { TweetsService } from '../tweets.service';
import { TweetsComponent } from '../tweets/tweets.component';

@NgModule({
  declarations: [
    CreateReplyComponent,
    CreateTweetComponent,
    TweetBodyComponent,
    EditTweetComponent,
    TweetOptionsComponent,
    TweetWrapperComponent,
    TweetDetailsComponent,
    TweetsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,
    SharedModule
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
    EditTweetComponent,
    TweetOptionsComponent,
    TweetWrapperComponent,
    TweetDetailsComponent,
    TweetsComponent,
  ]
})
export class TweetModule { }

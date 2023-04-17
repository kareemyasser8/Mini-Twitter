import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

import { TweetsService } from '../tweets.service';
import { Tweet } from '../tweet.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'tweet-wrapper',
  templateUrl: './tweet-wrapper.component.html',
  styleUrls: ['./tweet-wrapper.component.css']
})
export class TweetWrapperComponent implements OnInit, OnDestroy {

  RouteSubscription: Subscription;
  tweetSubscription: Subscription;
  authSubscription: Subscription;

  tweetId: string;
  fetchedTweet$: Observable<Tweet>;
  fetchedReplies$: Observable<Tweet[]>;
  isAuthenticated: boolean
  username: string

  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetsService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.RouteSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.tweetId = params.get('id');
      this.tweetSubscription = this.tweetService.fetchTweet(this.tweetId).subscribe({
        next: (result) => {
          console.log(result[0])
          this.fetchedTweet$ = of(result[0])
          this.fetchedReplies$ = of(result.replies)
          this.isAuthenticated = this.authService.getIsAuth()
          this.username = this.authService.getUsername();
        },
        error: (err) => { console.log(err) }
      });
    });
  }


  trackByFn(index: number, tweet: Tweet) {
    return tweet.id; // return the unique identifier for the tweet object
  }

  ngOnDestroy(): void {
    this.RouteSubscription.unsubscribe()
    this.tweetSubscription.unsubscribe()
  }

}

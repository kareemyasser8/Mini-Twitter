import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tweet } from '../tweet.model';
import { TweetsService } from './../tweets.service';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  tweets: Tweet[] = []
  tweetsSubscription: Subscription

  constructor(private tweetsService: TweetsService) {

  }

  trackById(index: number, tweet: Tweet): number {
    return tweet.id
  }

  ngOnInit(): void {
    this.tweets = this.tweetsService.getTweets();
    this.tweetsSubscription = this.tweetsService.getTweetsUpdateListener()
      .subscribe({
        next: (tweets: Tweet[]) => {
          this.tweets = tweets
        }
      })
  }

  ngOnDestroy(): void {
    this.tweetsSubscription.unsubscribe();
  }

}

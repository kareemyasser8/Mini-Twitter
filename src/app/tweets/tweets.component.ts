import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tweet } from '../tweet.model';
import { TweetsService } from './../tweets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  tweets: Tweet[] = []
  tweetsSubscription: Subscription
  desiredUser: string;


  constructor(private tweetsService: TweetsService, private route: ActivatedRoute) {

  }

  trackById(index: number, tweet: Tweet): number {
    return tweet.id
  }

  ngOnInit(): void {
    this.tweetsService.getTweets();
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

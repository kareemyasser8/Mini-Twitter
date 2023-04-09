import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tweet } from '../tweet.model';
import { TweetsService } from './../tweets.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  tweets: Tweet[] = []
  tweetsSubscription: Subscription
  desiredUser: string;
  isLoading: boolean = true;
  @Input() isDeleteLoading: boolean = false;
  @Input() userIsAuthenticated;

  constructor(
    private tweetsService: TweetsService,
    private route: ActivatedRoute) {

  }

  // trackById(index: number, tweet: Tweet): number {
  //   return tweet.id
  // }



  ngOnInit(): void {



    this.tweetsService.getTweets();
    this.tweetsSubscription = this.tweetsService.getTweetsUpdateListener()
      .subscribe({
        next: (tweets: Tweet[]) => {
          this.isLoading = false;
          this.tweets = tweets.reverse()
        }
      })
  }

  ngOnDestroy(): void {

    this.tweetsSubscription.unsubscribe();
  }

  onDeleteTweetClicked(isLoading: boolean) {
    this.isDeleteLoading = isLoading;
  }

}

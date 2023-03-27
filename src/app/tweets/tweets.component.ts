import { TweetsService } from './../tweets.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  // @Input() tweets = [
  //   {tweet: "Hello world"}
  // ];

  tweets = []
  tweetsSubscription : Subscription

  constructor(private tweetsService:TweetsService) {

   }

  ngOnInit(): void {
    this.tweets = this.tweetsService.getTweets();
    this.tweetsSubscription = this.tweetsService.getTweetsUpdateListener()
    .subscribe({
      next: (tweets: any[])=>{
         this.tweets = tweets
        }
    })
  }

  ngOnDestroy(): void {
    this.tweetsSubscription.unsubscribe();
  }

}

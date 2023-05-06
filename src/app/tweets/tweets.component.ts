import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() tweetsToDisplay$: Observable<Tweet[]>
  @Input() isDeleteLoading: boolean = false;
  @Input() userIsAuthenticated;
  @Input() username;

  subscription: Subscription;
  reversedTweets: Tweet[];

  constructor() {

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscribeToTweetsToDisplay();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tweetsToDisplay$'] && !changes['tweetsToDisplay$'].firstChange) {
      this.subscribeToTweetsToDisplay();
    }
  }

  private subscribeToTweetsToDisplay() {
    if (this.tweetsToDisplay$) {
      this.subscription = this.tweetsToDisplay$.pipe(
        map(tweets => tweets.slice().reverse())
      ).subscribe(reversedTweets => {
        this.reversedTweets = reversedTweets;
      });
    }
  }

  trackById(index: number, tweet: Tweet) {
    return tweet.id;
  }

  onDeleteTweetClicked(isLoading: boolean) {
    this.isDeleteLoading = isLoading;
  }

}

import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent {

  @Input() tweetsToDisplay$: Observable<Tweet[]>
  @Input() isDeleteLoading: boolean = false;
  @Input() userIsAuthenticated;
  @Input() username;

  constructor() {

  }

  trackById(index: number, tweet: Tweet) {
    return tweet.id;
  }

  onDeleteTweetClicked(isLoading: boolean) {
    this.isDeleteLoading = isLoading;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('Input changed:', changes['username'].currentValue);
  // }

}

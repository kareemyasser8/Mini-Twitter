import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  onDeleteTweetClicked(isLoading: boolean) {
    this.isDeleteLoading = isLoading;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { TweetsService } from '../tweets.service';

@Component({
  selector: 'home-wrapper',
  templateUrl: './home-wrapper.component.html',
  styleUrls: ['./home-wrapper.component.css']
})
export class HomeWrapperComponent implements OnInit, OnDestroy {

  storedTweets = [];
  userIsAuthenticated: boolean;
  username: string;

  private authListenerSubs: Subscription
  allTweets$: Observable<any[]>


  constructor(private authService: AuthService, private tweetsService: TweetsService) { }


  onTweetAdded(tweet) {
    this.storedTweets.push(tweet);
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.username = this.authService.getUsername();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      {
        next: (isAuthenticated) => {
          this.userIsAuthenticated = isAuthenticated;
        },
        error: (err)=>{
          console.log(err);
        }
      }
    );
    this.tweetsService.getTweets();
    this.allTweets$ =this.tweetsService.getTweetsUpdateListener();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}

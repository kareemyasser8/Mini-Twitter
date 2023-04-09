import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'home-wrapper',
  templateUrl: './home-wrapper.component.html',
  styleUrls: ['./home-wrapper.component.css']
})
export class HomeWrapperComponent implements OnInit, OnDestroy {

  storedTweets = [];
  userIsAuthenticated: boolean;
  private authListenerSubs: Subscription


  constructor(private authService: AuthService) { }


  onTweetAdded(tweet) {
    this.storedTweets.push(tweet);
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
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
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}

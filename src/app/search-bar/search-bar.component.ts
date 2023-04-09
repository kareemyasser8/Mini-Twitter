import { Subscription } from 'rxjs';
import { TweetsService } from './../tweets.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  fetchedtweets: any[] = [];
  filteredTweets: any[]
  tweetsSubsciption: Subscription

  searching = false;
  focusOnList = false;

  userIsAuthenticated: boolean
  authSubscription : Subscription;

  constructor(private tweetsService: TweetsService, private authService: AuthService, private router: Router) {

    this.tweetsService.getTweets();
    this.tweetsSubsciption = this.tweetsService.getTweetsUpdateListener().subscribe({
      next: (tweets: Tweet[]) => {
        this.filteredTweets = this.fetchedtweets = tweets;
      }
    })
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authSubscription = this.authService.getAuthStatusListener().subscribe({
      next: (value)=>{
        this.userIsAuthenticated = value;
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }

  onLogOut(){
    this.authService.logout();

  }

  filter(query: string) {
    this.filteredTweets = (query) ?
      this.fetchedtweets.filter(t => t.author.toLowerCase().includes(query.toLowerCase())) : [];
  }

  ngOnDestroy(): void {
    this.tweetsSubsciption.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  showAuthor(a) {
    console.log(a);
  }


  ngOnInit(): void {
  }


}

import { Subscription } from 'rxjs';
import { TweetsService } from './../tweets.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  fetchedtweets: any[] = [];
  filteredTweets: any[]
  tweetsSubscription: Subscription


  tweetsSubsciption: Subscription

  searching = false;
  focusOnList = false;

  constructor(private tweetsService: TweetsService) {

    this.tweetsService.getTweets();
    this.tweetsSubsciption = this.tweetsService.getTweetsUpdateListener().subscribe({
      next: (tweets: Tweet[]) => {
        this.filteredTweets = this.fetchedtweets = tweets;
      }
    }
    )
  }


  filter(query: string) {
    this.filteredTweets = (query) ?
      this.fetchedtweets.filter(t => t.author.toLowerCase().includes(query.toLowerCase())) : [];
  }

  ngOnDestroy(): void {
    this.tweetsSubsciption.unsubscribe();
  }

  showAuthor(a){
    console.log(a);
  }


  ngOnInit(): void {
  }


}

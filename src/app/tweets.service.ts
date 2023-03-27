import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private tweets: any = [{tweet: "Hello I am good"}];
  private tweetsUpdated = new Subject()

  constructor() { }

  getTweets() {
    return [...this.tweets]
  }

  getTweetsUpdateListener(){
    return this.tweetsUpdated.asObservable();
  }

  addTweet(content: string) {
    const tweet = {
      tweet: content
    }

    this.tweets.push(tweet);
    this.tweetsUpdated.next([...this.tweets])
  }

}

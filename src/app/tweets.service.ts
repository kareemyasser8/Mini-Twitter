import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Tweet } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private tweets: Tweet[] = [
    {
      author: 'Kareem Yasser',
      text: 'Hello world maaan',
      date: new Date("2023-03-20"),
      likes: 10,
      comments: 5,
      replies: []
    }
  ];

  private tweetsUpdated = new Subject()
  private modalUpdate = new Subject()

  constructor() { }

  //-----------------------------------------------------------------

  toggleModal(input: boolean){
    this.modalUpdate.next(input)
  }

  getModal(){
    return this.modalUpdate.asObservable();
  }

  getTweets() {
    return [...this.tweets]
  }

  getTweetsUpdateListener() {
    return this.tweetsUpdated.asObservable();
  }

  addTweet(content: string) {

    var d = new Date();

    const tweet: Tweet = {
      author: 'Kareem Yasser',
      text: content,
      date: d,
      likes: 0,
      comments: 0,
      replies: []
    }

    this.tweets.push(tweet);
    this.tweetsUpdated.next([...this.tweets])
  }

}

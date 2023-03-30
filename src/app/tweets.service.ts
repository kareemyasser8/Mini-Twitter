import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Tweet } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private tweets: Tweet[] = [
    {
      id: 1,
      author: 'Kareem Yasser',
      text: 'Hello world maaan',
      date: new Date("2023-03-20"),
      likes: 10,
      comments: 5,
      replies: []
    },
    {
      id: 2,
      author: 'Mohamed Hassan',
      text: 'This code is available on github (Branch Name:) feature/rxjsSubject',
      date: new Date("2023-03-28"),
      likes: 3,
      comments: 25,
      replies: []
    }
  ];

  private modal: boolean = false;

  private tweetsUpdated = new Subject()
  private modalUpdate = new Subject()

  constructor() { }

  //-----------------------------------------------------------------

  toggleModal(input: boolean){
    this.modal = input;
    this.modalUpdate.next(this.modal)
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
    let lastId = this.tweets[length].id + 1;

    const tweet: Tweet = {
      id: lastId,
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

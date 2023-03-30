import { ProfilesService } from './profiles.service';
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

  private tweetsUpdated = new Subject()


  constructor(private profileService: ProfilesService) { }

  //-----------------------------------------------------------------


  getTweets() {
    return [...this.tweets]
  }

  getTweetsUpdateListener() {
    return this.tweetsUpdated.asObservable();
  }

  getTodayDate() {
    return new Date();
  }

  getLastId(tweetsArray: Tweet[]) {

    if (tweetsArray.length == 0) {
      return 0;
    } else {
      return tweetsArray[length].id
    }

  }

  addTweet(content: string) {

    let lastId = this.getLastId(this.tweets) + 1;

    const tweet: Tweet = {
      id: lastId,
      author: 'Kareem Yasser',
      text: content,
      date: this.getTodayDate(),
      likes: 0,
      comments: 0,
      replies: []
    }

    this.tweets.push(tweet);
    this.tweetsUpdated.next([...this.tweets])
  }

  addReply(tweet: Tweet, content) {

    let lastId = this.getLastId(tweet.replies) + 1;
    const reply: Tweet = {
      id: lastId,
      author: 'Kareem Yasser',
      text: content,
      date: this.getTodayDate(),
      likes: 0,
      comments: 0,
      replies: []
    }

    tweet.replies.push(reply);
    tweet.comments += 1;
    console.log("The comments replies: ", tweet.replies)
  }

}

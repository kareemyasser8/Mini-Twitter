import { ProfilesService } from './profiles.service';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

import { Tweet } from './tweet.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private tweets: Tweet[] = [

  ];

  private tweetsUpdated = new Subject()


  constructor(private http: HttpClient) { }

  //-----------------------------------------------------------------


  getTweets() {
    this.http.get<{ message: string, tweets: any }>
      ('http://localhost:3000/api/tweets')
      .pipe(map((tweetData)=>{
        return tweetData.tweets.map(tweet=>{
          return {
            text: tweet.text,
            author: tweet.author,
            date: new Date(tweet.date),
            likes: tweet.likes,
            comments: tweet.comments,
            replies: tweet.replies,
            id: tweet._id
          }
        })
      }))
      .subscribe({
        next: (tweet) => {
          this.tweets = tweet
          // this.tweets.forEach(t => {
          //   t.date = new Date(t.date)
          // })
          this.tweetsUpdated.next([...this.tweets])
        }
      })
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

    this.http.post<{ message: string }>('http://localhost:3000/api/tweets', tweet).
      subscribe({
        next: (responseData) => {
          // console.log(responseData.message);
          this.tweets.push(tweet);
          this.tweetsUpdated.next([...this.tweets])
        }
      })

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

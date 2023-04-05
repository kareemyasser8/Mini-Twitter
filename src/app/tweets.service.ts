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
          this.tweetsUpdated.next([...this.tweets])
        }
      })
    return [...this.tweets]
  }

  deleteTweet(tweetId){
    this.http.delete('http://localhost:3000/api/tweets/' + tweetId)
    .subscribe((response)=>{
      const tweetsUpdated = this.tweets.filter(t => t.id !== tweetId)
      this.tweets = tweetsUpdated;
      this.tweetsUpdated.next([...this.tweets])
    })
  }

  getTweetsUpdateListener() {
    return this.tweetsUpdated.asObservable();
  }

  getTodayDate() {
    return new Date();
  }

  // getLastId(tweetsArray: Tweet[]) {

  //   if (tweetsArray.length == 0) {
  //     return 0;
  //   } else {
  //     return tweetsArray[length].id
  //   }

  // }

  addTweet(content: string) {
    const tweet: Tweet = {
      id: "",
      author: 'Kareem Yasser',
      text: content,
      date: this.getTodayDate(),
      likes: 0,
      comments: 0,
      replies: []
    }

    this.http.post<{ message: string, tweetId: string }>('http://localhost:3000/api/tweets', tweet).
      subscribe({
        next: (responseData) => {
          tweet.id = responseData.tweetId
          this.tweets.push(tweet);
          this.tweetsUpdated.next([...this.tweets])
        }
      })

  }

  addReply(tweet: Tweet, content) {

    // let lastId = this.getLastId(tweet.replies) + 1;
    const reply: Tweet = {
      id: null,
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

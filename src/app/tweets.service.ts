import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, merge, mergeMap, Observable, of, Subject } from 'rxjs';

import { Tweet } from './tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private tweets: Tweet[] = [

  ];

  private tweetsUpdated = new Subject<Tweet[]>()


  constructor(private http: HttpClient) { }

  //-----------------------------------------------------------------


  getTweets(): Tweet[] {
    this.http.get<{ message: string, tweets: any }>
      ('http://localhost:3000/api/tweets')
      .pipe(map((tweetData) => {
        return tweetData.tweets.map(tweet => {
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

  updateTweet(tweetToEdit: Tweet, newTweetText: string): Observable<any> {
    const id = tweetToEdit.id;
    const update = {
      id: id,
      text: newTweetText
    }

    return this.http.patch('http://localhost:3000/api/tweets/' + id, update)
      .pipe(mergeMap(
        (response) => {
          // console.log(result.message)
          this.tweets.map(t => {
            if (t.id === id) t.text = newTweetText;
          })
          this.tweetsUpdated.next([...this.tweets])
          return of(response)
        }))
  }

  deleteTweet(tweetId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/tweets/' + tweetId)
      .pipe(mergeMap(
        (response) => {
          const tweetsUpdated = this.tweets.filter(t => t.id !== tweetId);
          this.tweets = tweetsUpdated;
          this.tweetsUpdated.next([...this.tweets]);
          return of(response);
        }
      ));
  }

  getTweetsUpdateListener(): Observable<Tweet[]> {
    return this.tweetsUpdated.asObservable();
  }

  getTodayDate(): Date {
    return new Date();
  }

  // getLastId(tweetsArray: Tweet[]) {

  //   if (tweetsArray.length == 0) {
  //     return 0;
  //   } else {
  //     return tweetsArray[length].id
  //   }

  // }

  addTweet(content: string): Observable<any> {
    const tweet: Tweet = {
      id: "",
      author: 'Kareem Yasser',
      text: content,
      date: this.getTodayDate(),
      likes: 0,
      comments: 0,
      replies: []
    }

    return this.http.post<{ message: string, tweetId: string }>('http://localhost:3000/api/tweets', tweet)
      .pipe(
        mergeMap((responseData) => {
          tweet.id = responseData.tweetId
          this.tweets.push(tweet);
          this.tweetsUpdated.next([...this.tweets])
          return of(responseData);
        })
      );
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

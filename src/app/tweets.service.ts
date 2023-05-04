import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';
import { Tweet } from './tweet.model';
import { environment } from 'src/environments/environment.prod';

const BACKEND_URL = environment.apiUrl + "tweets/";
@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private allTweets: Tweet[] = [];
  private allTweetsUpdated = new Subject<Tweet[]>()

  private allUserTweets: Tweet[] = []
  private allUserTweetsUpdated = new Subject<Tweet[]>()

  private tweetDetail: any;
  private tweetDetailUpdated = new Subject<Tweet>()

  private tweetReplies: Tweet[];
  private tweetRepliesUpdated = new Subject<Tweet[]>()

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationsService) { }

  updateAllTweets(tweetId?) {
    this.getTweets();
    if (tweetId) {
      this.fetchTweet(tweetId)
      this.fetchReplies(tweetId);
    }
  }

  fetchTweet(tweetId: string): void {
    const tweetUrl = BACKEND_URL + tweetId + "/details"

    let tweet$ = this.http.get<Tweet>(tweetUrl).pipe(
      map((tweetData: any) => {
        const tweet = tweetData.tweet
        return tweet;
      })
    )
    tweet$.subscribe({
      next: (tweet) => {
        // this.tweetDetail = tweet;
        this.tweetDetail = tweet;
        this.tweetDetailUpdated.next({ ...this.tweetDetail });
      },
      error: (err) => {
        // console.log(err)
      }
    })

  }

  fetchReplies(tweetId: string): void {
    const repliesUrl = BACKEND_URL + tweetId + "/replies";

    let replies$ = this.http.get<Tweet[]>(repliesUrl).pipe(
      map((repliesData: any) => {
        return repliesData.replies.map((reply) => {
          return {
            text: reply.text,
            author: reply.author,
            creatorId: reply.creatorId,
            username: reply.username,
            date: new Date(reply.date),
            likedBy: reply.likedBy,
            likes: reply.likes,
            commentedBy: reply.commentedBy,
            comments: reply.comments,
            id: reply._id
          }
        })
      })
    )

    replies$.subscribe((replies) => {
      this.tweetReplies = replies;
      this.tweetRepliesUpdated.next([...this.tweetReplies])
    })

  }

  getTweetDetailsListener(): Observable<any> {
    return this.tweetDetailUpdated.asObservable();
  }

  getTweetRepliesListener(): Observable<any> {
    return this.tweetRepliesUpdated.asObservable();
  }

  getTweetDetail() {
    return this.tweetDetail;
  }

  getTweetReplies() {
    return this.tweetReplies;
  }


  //-----------------------------------------------------------------

  tweetInit(content): Tweet {
    return {
      id: "",
      author: this.authService.getUserFullName(),
      text: content,
      date: this.getTodayDate(),
      likes: 0,
      comments: 0,
      replies: [],
      authorId: "",
      username: this.authService.getUsername(),
      likedBy: [],
      commentedBy: []
    }
  }


  getTweets(): Tweet[] {
    this.http.get<{ message: string, tweets: any }>
      (BACKEND_URL)
      .pipe(map((tweetData) => {
        return tweetData.tweets.map(tweet => {
          return {
            text: tweet.text,
            author: tweet.author,
            creatorId: tweet.creatorId,
            username: tweet.username,
            date: new Date(tweet.date),
            likedBy: tweet.likedBy,
            likes: tweet.likes,
            commentedBy: tweet.commentedBy,
            comments: tweet.comments,
            replies: tweet.replies,
            id: tweet._id
          }
        })
      }))
      .subscribe({
        next: (tweet) => {
          // console.log(tweet);
          this.allTweets = tweet;
          this.allTweetsUpdated.next([...this.allTweets])
        }
      })
    return [...this.allTweets]
  }




  getTweetsOfProfile(username: string): Tweet[] {
    this.http.get<{ message: string, tweets: any }>(BACKEND_URL + username)
      .pipe(map((tweetData) => {
        return tweetData.tweets.map(tweet => {
          return {
            text: tweet.text,
            author: tweet.author,
            creatorId: tweet.creatorId,
            username: tweet.username,
            date: new Date(tweet.date),
            likedBy: tweet.likedBy,
            likes: tweet.likes,
            commentedBy: tweet.commentedBy,
            comments: tweet.comments,
            replies: tweet.replies,
            id: tweet._id
          }
        })
      }))
      .subscribe({
        next: (tweet) => {
          // console.log(tweet);
          this.allUserTweets = tweet;
          this.allUserTweetsUpdated.next([...this.allUserTweets])
        }
      })
    return [...this.allUserTweets]
  }

  getAllUserTweetsUpdateListener(): Observable<Tweet[]> {
    return this.allUserTweetsUpdated.asObservable();
  }


  updateTweet(tweetToEdit: Tweet, newTweetText: string): Observable<any> {
    const id = tweetToEdit.id;

    // console.log(tweetToEdit.text)

    const update = {
      id: id,
      text: newTweetText
    }

    return this.http.patch(BACKEND_URL + id, update)
      .pipe(mergeMap(
        (response) => {

          if (this.allTweets) {
            this.allTweets.map(t => {
              if (t.id === id) t.text = newTweetText;
            })

            this.allTweetsUpdated.next([...this.allTweets])
          }

          if (this.allUserTweets) {

            this.allUserTweets.map(t => {
              if (t.id === id) t.text = newTweetText;
            })

            this.allUserTweetsUpdated.next([...this.allUserTweets])
          }

          if (this.tweetReplies) {
            this.tweetReplies.map(t => {
              if (t.id === id) t.text = newTweetText;
            })

            this.tweetRepliesUpdated.next([...this.tweetReplies])
          }

          return of(response)
        }))

  }



  deleteTweet(tweetId: string): Observable<any> {

    return this.http.delete(BACKEND_URL + tweetId)
      .pipe(mergeMap(
        (response: any) => {

          if (response.tweet._id && response.tweet.parentId) {
            let index = this.tweetReplies.findIndex(r => r.id === response.tweet._id)
            if (index !== -1) {
              this.tweetReplies.splice(index, 1);
            }

            this.tweetDetail[0].comments -= 1;
            this.tweetDetailUpdated.next(this.tweetDetail);
            this.tweetRepliesUpdated.next([...this.tweetReplies])
          }

          const tweetsUpdated = this.allTweets.filter(t => t.id !== tweetId);

          this.allTweets = tweetsUpdated;
          this.allTweetsUpdated.next([...this.allTweets]);

          const tweetsUpdatedForUser = this.allUserTweets.filter(t => t.id !== tweetId);
          this.allUserTweets = tweetsUpdatedForUser;
          this.allUserTweetsUpdated.next([...this.allUserTweets]);

          return of(response);
        }
      ));
  }



  getTweetsUpdateListener(): Observable<Tweet[]> {
    return this.allTweetsUpdated.asObservable();
  }

  getTodayDate(): Date {
    return new Date();
  }


  likeTweet(tweetId: string) {
    const url = BACKEND_URL + tweetId + '/like';
    let currentUser = this.authService.getUsername();

    let result = this.notificationService.sendLikeNotification(tweetId);
    result.subscribe({
      next: (res) => {
        // console.log(res)
      },
      error: (err) => { console.log(err) }
    }
    )
    return this.http.patch(url, {});
  }

  unlikeTweet(tweetId: string) {
    const url = BACKEND_URL + tweetId + '/unlike';
    let result = this.notificationService.removeLikeNotification(tweetId)
    result.subscribe({
      next: (res) => {
        // console.log(res)
      },
      error: (err) => { console.log(err) }
    })
    return this.http.patch(url, {});
  }


  addTweet(content: string): Observable<any> {
    const tweet = this.tweetInit(content);

    return this.http.post<{ message: string, tweetId: string }>(BACKEND_URL, tweet)
      .pipe(
        mergeMap((responseData) => {
          tweet.id = responseData.tweetId
          this.allTweets.push(tweet);
          this.allTweetsUpdated.next([...this.allTweets])
          return of(responseData);
        })
      );
  }


  addReply(tweet: any, content): Observable<any>{

    const reply = this.tweetInit(content)

    const tweetId = tweet.id || tweet._id;
    const url = BACKEND_URL + tweetId + '/reply';

    let result = this.notificationService.sendReplyNotification(tweetId);

    result.subscribe({
      next: (res) => {
        // console.log(res)
      },
      error: (err) => { console.log(err) }
    }
    )

    return this.http.patch<{ message: string, updatedTweet: Tweet }>(url, reply)
      .pipe(
        mergeMap((responseData: any) => {
          this.allTweets.forEach((t) => {
            if (t.id === responseData.tweet._id) {
              t.replies.push(responseData.tweet);
            }
          })
          this.allTweetsUpdated.next([...this.allTweets])
          return of(responseData);
        })
      );
  }

}

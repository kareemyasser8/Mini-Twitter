import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, merge, mergeMap, Observable, of, Subject, tap } from 'rxjs';

import { Tweet } from './tweet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {

  private allTweets: Tweet[] = [];
  private allTweetsUpdated = new Subject<Tweet[]>()

  private allUserTweets: Tweet[] = []
  private allUserTweetsUpdated = new Subject<Tweet[]>()

  private tweetDetail: Tweet;
  private tweetDetailUpdated = new Subject<Tweet>()

  private tweetReplies: Tweet[];
  private tweetRepliesUpdated = new Subject<Tweet[]>()


  constructor(private http: HttpClient, private authService: AuthService) { }

  updateAllTweets(tweetId?) {
    this.getTweets();
    if (tweetId) {
      console.log(true);
      this.fetchTweet(tweetId)
    }
  }

  fetchTweet(tweetId: string): void{
    const tweetUrl = "http://localhost:3000/api/tweets/" + tweetId + "/details"

    let tweet$ = this.http.get<Tweet>(tweetUrl).pipe(
      map((tweetData: any) => {
        const tweet = tweetData.tweet
        return tweet;
      })
    )
    tweet$.subscribe({
      next: (tweet) => {
        this.tweetDetail = tweet;
        this.tweetDetailUpdated.next(this.tweetDetail);
      },
      error: (err)=>{
        console.log(err)
      }
    })

  }

  fetchReplies(tweetId: string): void{
    const repliesUrl = "http://localhost:3000/api/tweets/" + tweetId + "/replies";

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

  getTweetDetailsListener(): Observable<any>{
    return this.tweetDetailUpdated.asObservable();
  }

  getTweetRepliesListener(): Observable<any>{
    return this.tweetRepliesUpdated.asObservable();
  }

  getTweetDetail(){
    return this.tweetDetail;
  }

  getTweetReplies(){
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
      ('http://localhost:3000/api/tweets')
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
          this.allTweets = tweet
          this.allTweetsUpdated.next([...this.allTweets])
        }
      })
    return [...this.allTweets]
  }

  getTweetsOfProfile(username: string): Tweet[] {
    this.http.get<{ message: string, tweets: any }>('http://localhost:3000/api/tweets/' + username)
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
          this.allUserTweets = tweet
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
    const update = {
      id: id,
      text: newTweetText
    }

    return this.http.patch('http://localhost:3000/api/tweets/' + id, update)
      .pipe(mergeMap(
        (response) => {
          this.allTweets.map(t => {
            if (t.id === id) t.text = newTweetText;
          })

          this.allUserTweets.map(t => {
            if (t.id === id) t.text = newTweetText;
          })

          this.allUserTweetsUpdated.next([...this.allUserTweets])

          this.allTweetsUpdated.next([...this.allTweets])
          return of(response)
        }))
  }

  deleteTweet(tweetId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/api/tweets/' + tweetId)
      .pipe(mergeMap(
        (response: any) => {
          // console.log(response.tweet.parentId);

          if (response.tweet._id) {

            console.log("hello world")
            // console.log(response.tweet)

            let index = this.tweetReplies.findIndex(r => r.id === response.tweet._id)
            if (index !== -1) {
              this.tweetReplies.splice(index, 1);
            }
            console.log(this.tweetReplies)
            this.tweetRepliesUpdated.next([...this.tweetReplies])


            // this.allTweets.forEach(t => {
            //   if (t.id === response.tweet.parentId) {
            //     console.log(tweetId)
            //     const index = t.replies.findIndex(r => r === tweetId);
            //     console.log(index);
            //     if (index !== -1) {
            //       t.replies.splice(index, 1);
            //     }
            //     console.log(t.replies)
            //   }
            // })

          }

          const tweetsUpdated = this.allTweets.filter(t => t.id !== tweetId);

          this.allTweets = tweetsUpdated;
          // console.log(this.allTweets)
          this.allTweetsUpdated.next([...this.allTweets]);

          const tweetsUpdatedForUser = this.allUserTweets.filter(t => t.id !== tweetId);
          this.allUserTweets = tweetsUpdatedForUser;
          this.allUserTweetsUpdated.next([...this.allUserTweets]);

          console.log("response",response);



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
    const url = `http://localhost:3000/api/tweets/${tweetId}/like`;
    return this.http.patch(url, {});
  }

  unlikeTweet(tweetId: string) {
    const url = `http://localhost:3000/api/tweets/${tweetId}/unlike`;
    return this.http.patch(url, {});
  }


  addTweet(content: string): Observable<any> {
    const tweet = this.tweetInit(content);

    return this.http.post<{ message: string, tweetId: string }>('http://localhost:3000/api/tweets', tweet)
      .pipe(
        mergeMap((responseData) => {
          tweet.id = responseData.tweetId
          this.allTweets.push(tweet);
          this.allTweetsUpdated.next([...this.allTweets])
          return of(responseData);
        })
      );
  }


  addReply(tweet: Tweet, content) {

    const reply = this.tweetInit(content)

    const tweetId = tweet.id;
    const url = `http://localhost:3000/api/tweets/${tweetId}/reply`;

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

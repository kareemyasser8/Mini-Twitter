import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

import { TweetsService } from '../tweets.service';
import { Tweet } from '../tweet.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'tweet-wrapper',
  templateUrl: './tweet-wrapper.component.html',
  styleUrls: ['./tweet-wrapper.component.css']
})
export class TweetWrapperComponent implements OnInit, OnDestroy {

  RouteSubscription: Subscription;
  tweetSubscription: Subscription;
  authSubscription: Subscription;

  tweetId: string;
  fetchedTweet$: Observable<Tweet[]>;
  isAuthenticated: boolean
  username: string

  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetsService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.RouteSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.tweetId = params.get('id');
      this.tweetSubscription = this.tweetService.fetchTweet(this.tweetId).subscribe({
        next: (result) => {
          // console.log(result)
          this.fetchedTweet$ = of(result)
          this.isAuthenticated = this.authService.getIsAuth()
          this.username = this.authService.getUsername();
        },
        error: (err) => { console.log(err) }
      });
    });
  }

  makeObservable(object: any[]): Observable<any> {

    const newObject = object.map(tweet => {
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

    console.log(newObject)

    return of(newObject);
  }

  ngOnDestroy(): void {
    this.RouteSubscription.unsubscribe()
    this.tweetSubscription.unsubscribe()
  }

}

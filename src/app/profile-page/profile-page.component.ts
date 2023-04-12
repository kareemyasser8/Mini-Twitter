import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { TweetsService } from '../tweets.service';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  RouteSubscription: Subscription;
  profileSubscripton: Subscription;

  username: string;
  user$: Observable<any>;
  UserTweets$: Observable<Tweet[]>;


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private tweetService: TweetsService) {
  }

  ngOnDestroy(): void {
    this.RouteSubscription.unsubscribe();
    this.profileSubscripton.unsubscribe();
  }

  ngOnInit(): void {
    this.RouteSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
      this.profileSubscripton = this.authService.fetchProfile(this.username).subscribe({
        next: (result) => {
          this.user$ = of(result)
          this.tweetService.getTweetsOfProfile(this.username);
          this.UserTweets$ = this.tweetService.getAllUserTweetsUpdateListener()
        },
        error: (err) => { console.log(err) }
      });
    });

    // this.tweetService.getTweetsOfProfile(this.username);


    // this.UserTweets$.subscribe((res)=>{console.log("result =>",res)});

  }
}

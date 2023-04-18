import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Tweet } from '../tweet.model';
import { DatePipe } from '@angular/common';
import { TweetsService } from '../tweets.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {

  @Input() tweetBody: any;

  likeClicked: boolean = false;
  likeTweetSubscription: Subscription;
  unlikeTweetSubscription: Subscription;
  userIsAuthenticated: boolean;

  username: string
  currentUsername: string

  constructor(private tweetService: TweetsService, private authService: AuthService) { }

  ngOnInit() {
    this.updateUsername();
    // console.log(this.tweetBody.likedBy);
    this.currentUsername = this.authService.getUsername();
    this.userIsAuthenticated = this.authService.getIsAuth();

    if(this.tweetBody.likedBy.includes(this.currentUsername)){
      this.likeClicked = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateUsername();
  }

  updateUsername() {
    if (this.tweetBody) {
      const words = this.tweetBody.text?.match(/\S+/g);
      if (words && words[0].startsWith('@')) {
        this.username = words[0] // Set the username to the first word without the "@"
        words.shift(); // Remove the first word from the array
        this.tweetBody.text = words.join(' '); // Join the remaining words into a string
      }
    }
  }

  convertDateFormat(data){
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(data, 'h:mm a - MMM d, y');
    return formattedDate;
  }

  clickLike() {
    if (this.likeClicked == false) {
      this.likeClicked = true
      this.tweetBody.likes += 1;

      this.likeTweetSubscription = this.tweetService.likeTweet(this.tweetBody._id)
      .subscribe(
          {
            next: (result)=>{},
            error: (err)=>{
              console.log(err);
              this.likeClicked = false;
              this.tweetBody.likes -= 1;
            }
          }
        )
    } else {
      this.likeClicked = false
      this.tweetBody.likes -= 1;

      this.unlikeTweetSubscription = this.tweetService.unlikeTweet(this.tweetBody._id)
      .subscribe(
          {
            next: (result)=>{},
            error: (err)=>{
              console.log(err);
              this.likeClicked = true;
              this.tweetBody.likes += 1;
            }
          }
        )

    }
  }


  clickComment(){

  }
}

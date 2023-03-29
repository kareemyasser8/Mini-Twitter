import { TweetsService } from './../tweets.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})



export class CreateTweetComponent implements OnInit {

  maxTweetLength = 150;
  tweetLength = 0;

  constructor(private tweetsService: TweetsService) {

  }

  ngOnInit(): void {
  }

  countCharacters(tweet) {
    this.tweetLength = tweet.length;
  }

  createTweet(tweetform: NgForm) {
    if (tweetform.invalid) return
    this.tweetsService.addTweet(tweetform.value.tweet)
    this.tweetLength = 0;
    tweetform.resetForm();
    console.log(tweetform.value.tweet);
  }

}

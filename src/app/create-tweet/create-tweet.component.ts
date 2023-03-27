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

  constructor(private tweetsService:TweetsService) {

   }

  ngOnInit(): void {
  }

  countCharacters(tweet){
    this.tweetLength = tweet.length;
  }

  createTweet(tweetform: NgForm){
    if(tweetform.invalid) return
    // const tweet = {
    //   tweet: tweetform.value.tweet
    // }

    this.tweetsService.addTweet(tweetform.value.tweet)
    tweetform.resetForm();
    console.log(tweetform.value.tweet);
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})



export class CreateTweetComponent implements OnInit {

  maxTweetLength = 150;
  tweetLength = 0;
  @Output() tweetCreated = new EventEmitter()


  // tweetForm = new FormGroup({
  //   tweet: new FormControl()
  // })


  constructor() { }

  ngOnInit(): void {
  }

  countCharacters(tweet){
    this.tweetLength = tweet.length;
  }

  createTweet(tweetform: NgForm){
    if(tweetform.invalid) return
    const tweet = {
      tweet: tweetform.value.tweet
    }
    console.log(tweet);
    this.tweetCreated.emit(tweet)
  }

}

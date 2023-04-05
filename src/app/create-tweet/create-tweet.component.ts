import { Tweet } from './../tweet.model';
import { TweetsService } from './../tweets.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.css']
})



export class CreateTweetComponent implements OnInit {

  maxTweetLength = 150;
  tweetLength = 0;
  tweetplaceHolder = "What is happening ?"
  tweetInputEditingText = ""

  @Input() replyTo: Tweet;
  @Input() tweetToEdit: Tweet

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private tweetsService: TweetsService) {

  }

  ngOnInit(): void {
    if (this.replyTo == null && this.tweetToEdit == null) return
    if (this.tweetToEdit != null) {
      console.log(this.tweetToEdit.text);
      this.tweetInputEditingText = this.tweetToEdit.text;
    }
    this.tweetplaceHolder = "Tweet your reply"
  }

  countCharacters(tweet) {
    this.tweetLength = tweet.length;
  }

  createTweet(tweetform: NgForm) {

    if (tweetform.invalid) return

    if (this.replyTo == null) {
      this.tweetsService.addTweet(tweetform.value.tweet)
    } else {
      this.tweetsService.addReply(this.replyTo, tweetform.value.tweet)
      this.formSubmitted.emit();
    }

    this.clearTweetForm(tweetform)
  }

  clearTweetForm(tweetform) {
    this.tweetLength = 0;
    tweetform.resetForm();
  }

}

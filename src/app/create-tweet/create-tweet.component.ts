import { ActivatedRoute } from '@angular/router';
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

  maxTweetLength = 300;
  tweetLength = 0;
  tweetplaceHolder = "What is happening ?"
  tweetInputEditingText = ""
  isloading: boolean = false;

  @Input() replyTo: Tweet;
  @Input() tweetToEdit: Tweet

  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private tweetsService: TweetsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    if (this.replyTo == null && this.tweetToEdit == null) return
    if (this.tweetToEdit != null) {
      console.log(this.tweetToEdit.text);
      this.tweetInputEditingText = this.tweetToEdit.text;
      this.tweetLength = this.tweetToEdit.text.length;
    }

    if(this.replyTo != null){
      // console.log(this.replyTo.username)

    }

    this.tweetplaceHolder = "Tweet your reply"


  }

  countCharacters(tweet) {
    this.tweetLength = tweet.length;
  }

  createTweet(tweetform: NgForm) {

    if (tweetform.invalid) return

    this.isloading = true;

    if (this.replyTo) {

      let mention = "@".concat(this.replyTo.username);
      let replyText = mention.concat(" ",tweetform.value.tweet)

      this.tweetsService.addReply(this.replyTo, replyText).subscribe({
        next: (response)=>{
          console.log(response.message);
          this.tweetsService.updateAllTweets(this.replyTo.id);
          this.isloading = false;
          this.clearTweetForm(tweetform)
          this.formSubmitted.emit();
        },
        error: (err)=>{
          console.log(err);
          this.isloading = false;
        }
      })
    }

    if (!this.replyTo && !this.tweetToEdit) {
      this.tweetsService.addTweet(tweetform.value.tweet).subscribe({
        next: (response) => {
          this.isloading = false;
          this.clearTweetForm(tweetform)
          this.formSubmitted.emit();
        },
        error: (err) => {
          console.log(err)
          this.isloading = false;
        }
      })
    }

    if (this.tweetToEdit) {
      this.editTweet(tweetform.value.tweet).subscribe({
        next: (response) => {
          console.log(response)
          this.isloading = false;
          this.clearTweetForm(tweetform)
          this.formSubmitted.emit();
        },
        error: (err) => {
          console.log(err)
          this.isloading = false;
        }
      })
    }
  }

  editTweet(text: string) {
    return this.tweetsService.updateTweet(this.tweetToEdit, text)
  }

  clearTweetForm(tweetform) {
    this.tweetLength = 0;
    tweetform.resetForm();
  }

}

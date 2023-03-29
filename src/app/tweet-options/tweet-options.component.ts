import { TweetsService } from './../tweets.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'tweet-options',
  templateUrl: './tweet-options.component.html',
  styleUrls: ['./tweet-options.component.css']
})
export class TweetOptionsComponent implements OnInit {

  @Input() tweetBody: Tweet = {
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: []
  }

  likeClicked = false;
  commentClicked: boolean= false;

  constructor(private tweetService : TweetsService) {

  }


  clickLike() {
    if (this.likeClicked == false) {
      this.likeClicked = true
      this.tweetBody.likes += 1;
    } else {
      this.likeClicked = false
      this.tweetBody.likes -= 1;
    }
  }

  clickComment() {
    this.tweetService.toggleModal(true)
  }

  ngOnInit(): void {
  }

}

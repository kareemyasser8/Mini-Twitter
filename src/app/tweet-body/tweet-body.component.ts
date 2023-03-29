import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'tweet-body',
  templateUrl: './tweet-body.component.html',
  styleUrls: ['./tweet-body.component.css']
})
export class TweetBodyComponent implements OnInit {

  @Input() tweetBody: Tweet = {
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: []
  }

  constructor() { }

  ngOnInit(): void {
  }

}

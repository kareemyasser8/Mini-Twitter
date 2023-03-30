import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'tweet-body',
  templateUrl: './tweet-body.component.html',
  styleUrls: ['./tweet-body.component.css']
})
export class TweetBodyComponent implements OnInit {

  @Input() tweetBody: Tweet = {
    id: null,
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: []
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('Input changed:', changes['tweetBody']);
  // }

  constructor() { }

  ngOnInit(): void {
  }

}

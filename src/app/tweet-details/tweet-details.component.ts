import { Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { Tweet } from '../tweet.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {

  @Input() tweetBody: Tweet = {
    id: null,
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: [],
    authorId: '',
    username: '',
    likedBy: [],
    commentedBy: []
  }

  likeClicked: boolean = false;


  username: string

  constructor() { }

  ngOnInit() {
    this.updateUsername();
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

}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Tweet } from '../tweet.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'tweet-body',
  templateUrl: './tweet-body.component.html',
  styleUrls: ['./tweet-body.component.css'],
})
export class TweetBodyComponent implements OnInit {

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

  username: string

  constructor(private sanitizer: DomSanitizer) {


  }

  get highlightedText(): SafeHtml {
    let text = this.tweetBody.text;

    // Highlight links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="highlighted" target="_blank">$1</a>');

    return this.sanitizer.bypassSecurityTrustHtml(text);

  }

  ngOnInit(): void {
    if (this.tweetBody) {

      const words = this.tweetBody.text.split(' ');
      if (words[0].startsWith('@')) {
        this.username = words[0]; // Set the username to the first word without the "@"
        words.shift(); // Remove the first word from the array
        this.tweetBody.text = words.join(' '); // Join the remaining words into a string
      } else {
        this.username = ''; // No username found
      }
      // console.log(this.username);
    }
  }

}

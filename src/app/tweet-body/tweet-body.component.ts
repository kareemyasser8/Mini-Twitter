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
    replies: []
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log('Input changed:', changes['tweetBody']);
  // }

  constructor(private sanitizer: DomSanitizer) { }

  get highlightedText(): SafeHtml {
    let text = this.tweetBody.text;

    // Highlight links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="highlighted" target="_blank">$1</a>');

    return this.sanitizer.bypassSecurityTrustHtml(text);

  }

  ngOnInit(): void {
  }

}

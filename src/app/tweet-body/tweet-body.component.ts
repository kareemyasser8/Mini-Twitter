import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Tweet } from '../tweet.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';


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

  constructor(private sanitizer: DomSanitizer, private router: Router) {


  }

  // get highlightedText(): SafeHtml {
  //   let text = this.tweetBody.text;

  //   // Highlight links
  //   text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="highlighted" target="_blank">$1</a>');

  //   return this.sanitizer.bypassSecurityTrustHtml(text);

  // }

  onTweetClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'a') {
      return;
    }
    this.router.navigate(['/home/tweet/', this.tweetBody.id]);
  }

  onMentionClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/home/profile/', this.username.slice(1)]);
  }

  get highlightedText(): SafeHtml {
    let text = this.tweetBody.text;

    // Highlight links
    text = text.replace(
      /(https?:\/\/[^\s]+)/g,
      `<a
      href="$1"
      class="highlighted"
      target="_blank"
      onmouseover="this.style.textDecoration='underline'"
      onmouseout="this.style.textDecoration='none'"
      style="text-decoration: none; color: #1DA1F2;">$1</a>`);

    // Highlight usernames
    text = text.replace(
      /@(\w+)/g,
      `<a
      href="/home/profile/$1"
      class="mention"
      style="text-decoration: none; color: #1DA1F2;"
      onmouseover="this.style.textDecoration='underline'"
      onmouseout="this.style.textDecoration='none'"
      routerLink="/home/profile/$1">$&</a>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }


  ngOnInit(): void {
    // if (this.tweetBody) {

    //   const words = this.tweetBody.text.split(' ');
    //   if (words[0].startsWith('@')) {
    //     this.username = words[0]; // Set the username to the first word without the "@"
    //     words.shift(); // Remove the first word from the array
    //     this.tweetBody.text = words.join(' '); // Join the remaining words into a string
    //   } else {
    //     this.username = ''; // No username found
    //   }
    //   // console.log(this.username);
    // }



  }

}

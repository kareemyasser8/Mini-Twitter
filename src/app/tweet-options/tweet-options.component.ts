import { TweetsService } from './../tweets.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'tweet-options',
  templateUrl: './tweet-options.component.html',
  styleUrls: ['./tweet-options.component.css']
})
export class TweetOptionsComponent implements OnInit {

  @Input() tweetBody: Tweet = {
    id: null,
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: []
  }

  likeClicked: boolean = false;
  commentClicked: boolean = false;
  threedotsClicked: boolean = false;

  constructor(private tweetService : TweetsService) {

  }

  get menu() {
    return document.querySelector('.menu');
  }

  private isClickInside(target: any): boolean {
    return this.menu && this.menu.contains(target);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    console.log("hio")
    if (!this.isClickInside(event.target)) {
      this.threedotsClicked = false;
    }
  }

  clickThreeDots(){
    event.stopPropagation();
    this.threedotsClicked = !this.threedotsClicked;
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
    this.commentClicked = true;
  }

  ngOnInit(): void {

  }

}

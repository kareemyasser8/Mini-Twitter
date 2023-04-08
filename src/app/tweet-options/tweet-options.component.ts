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
  editTweetClicked: boolean = false;
  isDeleteLoading: boolean = false;

  @Output() deleteTweetClicked = new EventEmitter<boolean>();

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
    if (!this.isClickInside(event.target)) {
      this.threedotsClicked = false;
    }
  }

  clickThreeDots(){
    event.stopPropagation();
    this.threedotsClicked = !this.threedotsClicked;
  }

  deleteTweet(tweetId){
    this.deleteTweetClicked.emit(true)
    this.tweetService.deleteTweet(tweetId).subscribe({
      next: (response)=>{
        this.deleteTweetClicked.emit(false)
      },
      error: (err)=>{
        console.log(err);
        this.deleteTweetClicked.emit(false)
      }
    })
  }

  clickEditTweet(){
    this.editTweetClicked = !this.editTweetClicked;
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

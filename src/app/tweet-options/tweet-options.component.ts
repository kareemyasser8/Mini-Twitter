import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tweet } from '../tweet.model';
import { TweetsService } from './../tweets.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'tweet-options',
  templateUrl: './tweet-options.component.html',
  styleUrls: ['./tweet-options.component.css']
})
export class TweetOptionsComponent implements OnInit, OnDestroy {

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
  commentClicked: boolean = false;
  threedotsClicked: boolean = false;
  editTweetClicked: boolean = false;
  isDeleteLoading: boolean = false;

  likeTweetSubscription: Subscription;

  @Input() username;
  @Input() userIsAuthenticated;

  @Output() deleteTweetClicked = new EventEmitter<boolean>();

  constructor(private tweetService : TweetsService, private authService: AuthService) {

  }
  ngOnDestroy(): void {
    if(this.likeTweetSubscription){
      this.likeTweetSubscription.unsubscribe();
    }
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
      // console.log("id: ",this.tweetBody.id)
      this.likeClicked = true
      this.tweetBody.likes += 1;

      this.likeTweetSubscription = this.tweetService.likeTweet(this.tweetBody.id)
      .subscribe(
          {
            next: (result)=>{console.log(result)},
            error: (err)=>{
              console.log(err);
              this.likeClicked = false;
              this.tweetBody.likes -= 1;
            }
          }
        )
    } else {
      this.likeClicked = false
      this.tweetBody.likes -= 1;
    }
  }

  clickComment() {
    this.commentClicked = true;
  }

  ngOnInit(): void {
    console.log(this.tweetBody.likedBy);
    if(this.tweetBody.likedBy.includes(this.username)){
      console.log("yes included");
      this.likeClicked = true;
    }
  }

}

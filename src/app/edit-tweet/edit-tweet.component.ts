import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.css']
})
export class EditTweetComponent implements OnInit, OnChanges {

  @Input() tweetToBeEdited: Tweet = {
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

  @Output() close = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: any) {
    console.log('tweetToBeEdited changed:', this.tweetToBeEdited);
  }

  closeModel() {
    this.close.emit(null);
  }
}

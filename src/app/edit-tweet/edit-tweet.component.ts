import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'edit-tweet',
  templateUrl: './edit-tweet.component.html',
  styleUrls: ['./edit-tweet.component.css']
})
export class EditTweetComponent implements OnInit {

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

  closeModel() {
    this.close.emit(null);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Tweet } from '../tweet.model';

@Component({
  selector: 'create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent {

  @Input() tweetToReply: Tweet = {
    id: null,
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: [],
    authorId: '',
    username: ''
  }

  @Output() close = new EventEmitter();

  constructor() {

  }

  closeModel() {
    this.close.emit(null);
  }

}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Tweet } from '../tweet.model';

@Component({
  selector: 'create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit, OnDestroy {

  @Input() tweetToReply: Tweet = {
    id: null,
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: []
  }

  @Output() close = new EventEmitter();

  constructor() {

  }

  closeModel(){
    this.close.emit(null);
  }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}

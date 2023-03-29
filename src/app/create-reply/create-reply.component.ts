import { Subscription } from 'rxjs';
import { TweetsService } from './../tweets.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet.model';

@Component({
  selector: 'create-reply',
  templateUrl: './create-reply.component.html',
  styleUrls: ['./create-reply.component.css']
})
export class CreateReplyComponent implements OnInit, OnDestroy {

  @Input() tweetToReply: Tweet = {
    author: '',
    text: '',
    date: undefined,
    likes: 0,
    comments: 0,
    replies: []
  }

  showModal: boolean
  modalSubscription : Subscription

  constructor(private tweetsService: TweetsService) {

  }

  ngOnInit(): void {
    this.modalSubscription = this.tweetsService.getModal().subscribe((result:boolean)=>{
        this.showModal = result;
    })
  }

  closeModel(){
    this.tweetsService.toggleModal(false)
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

}

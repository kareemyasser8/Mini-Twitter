import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-wrapper',
  templateUrl: './home-wrapper.component.html',
  styleUrls: ['./home-wrapper.component.css']
})
export class HomeWrapperComponent implements OnInit {

  storedTweets=[];

  constructor() { }

  onTweetAdded(tweet){
    this.storedTweets.push(tweet);
  }

  ngOnInit(): void {
  }

}

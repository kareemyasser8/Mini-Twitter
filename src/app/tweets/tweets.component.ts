import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  @Input() tweets = [
    {tweet: "Hello world"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

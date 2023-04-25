import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'empty-tweets',
  templateUrl: './empty-tweets.component.html',
  styleUrls: ['./empty-tweets.component.css']
})
export class EmptyTweetsComponent implements OnInit {

  @Input() emptyTweetsOfUser:boolean = false;
  @Input() emptyNotification: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

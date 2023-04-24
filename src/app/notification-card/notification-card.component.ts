import { Component, Input, OnInit } from '@angular/core';
import { NotificationTimeAgoPipe } from '../notification-time-ago.pipe';
import { Notification } from '../notification.modal';

@Component({
  selector: 'notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {

  @Input() notification: Notification;

  constructor() { }

  convertDate(string){
    return new Date(string);
  }

  ngOnInit(): void {
  }

}

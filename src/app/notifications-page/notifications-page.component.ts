import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NotificationsService } from '../notifications.service';
import { Subscription } from 'rxjs';
import { Notification } from '../notification.modal';

@Component({
  selector: 'notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css']
})
export class NotificationsPageComponent implements OnInit, OnDestroy {

  username: string
  notificationSubscription: Subscription;
  notifications: Notification[];

  constructor(private authService: AuthService, private notificationsService: NotificationsService) { }


  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.notificationsService.getNotifications(this.username);
    this.notificationSubscription = this.notificationsService.getNotificationsUpdateListener()
      .subscribe({
        next: (result: any) => {
          this.notifications = result.reverse()
          this.notificationsService.updateNotifications()
        },
        error: (err) => console.log(err)
      })

    if (this.notifications) {
      console.log(this.notifications)

    }

  }

  trackById(index: number, notification: any): string {
    return notification._id; // or any other unique identifier for the notification
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) this.notificationSubscription.unsubscribe();
  }

}

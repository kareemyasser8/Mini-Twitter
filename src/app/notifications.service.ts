import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[] = [];
  private notificationsUpdateListener = new Subject<Notification[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  notificationInit(tweetId,targetedUserId){
    return {
      id: "",
      message: this.authService.getUserFullName() + ' liked your tweet',
      tweetId: tweetId,
      targetedUserId: targetedUserId
    }
  }

  notifyLike(tweetId,targetedUserId){
    const notification = this.notificationInit(tweetId,targetedUserId);
    return this.http.post('http://localhost:3000/api/notifications/like',notification);
  }
}

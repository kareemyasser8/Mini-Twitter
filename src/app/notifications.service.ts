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

  constructor(private http: HttpClient, private authService: AuthService) { }

  sendLikeNotification(tweetId) {
    const url = "http://localhost:3000/api/notifications/" + tweetId
    const senderId = this.authService.getUserId();

    const like = {
      senderId: senderId,
      targetId: tweetId
    }
    return this.http.post(url, like);
  }
}

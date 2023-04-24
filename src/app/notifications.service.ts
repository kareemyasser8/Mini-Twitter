import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { Notification } from './notification.modal';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[] = [];
  private notificationsUpdateListener = new Subject<Notification[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNotificationsUpdateListener(): Observable<Notification[]>{
    return this.notificationsUpdateListener.asObservable();
  }

  getNotifications(username){
    const url = "http://localhost:3000/api/notifications/" + username
    const result = this.http.get(url);
    result.subscribe({
      next: (result:any)=> {
        this.notifications = result;
        this.notificationsUpdateListener.next(this.notifications);
        // console.log(result);
      },
      error: (err)=> console.log(err)
    })
  }

  sendLikeNotification(tweetId) {
    const url = "http://localhost:3000/api/notifications/" + tweetId +"/like"
    const senderId = this.authService.getUserId();

    const like = {
      senderId: senderId,
      targetId: tweetId
    }
    return this.http.post(url, like);
  }

  sendReplyNotification(tweetId) {
    const url = "http://localhost:3000/api/notifications/" + tweetId + "/reply"
    const senderId = this.authService.getUserId();

    const reply = {
      senderId: senderId,
      targetId: tweetId
    }
    return this.http.post(url, reply);
  }

  removeLikeNotification(tweetId){
    const senderId = this.authService.getUserId();
    const url = "http://localhost:3000/api/notifications/" + tweetId +'/'+ senderId +"/like"

    return this.http.delete(url)
  }

}

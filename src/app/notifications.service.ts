import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Notification } from './notification.modal';
import { environment } from 'src/environments/environment.prod';

const BACKEND_URL = environment.apiUrl + "notifications/";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifications: Notification[] = [];
  private notificationsUpdateListener = new Subject<Notification[]>();
  private isUpdatingNotifications = false;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.notifications = []
  }

  getNotificationsUpdateListener(): Observable<Notification[]> {
    return this.notificationsUpdateListener.asObservable();
  }

  getNotifications(username) {
    if(!username) return;
    const url = BACKEND_URL + username
    const result = this.http.get(url);
    result.subscribe({
      next: (result: any) => {
        this.notifications = result.notifications;
        this.notificationsUpdateListener.next(this.notifications);
      },
      error: (err) => console.log(err)
    })
  }

  sendLikeNotification(tweetId): Observable<any> {
    const url = BACKEND_URL + tweetId + "/like"
    const senderId = this.authService.getUserId();

    const like = {
      senderId: senderId,
      targetId: tweetId
    }
    return this.http.post(url, like)
  }

  sendReplyNotification(tweetId) {
    const url = BACKEND_URL + tweetId + "/reply"
    const senderId = this.authService.getUserId();

    const reply = {
      senderId: senderId,
      targetId: tweetId
    }
    return this.http.post(url, reply)
  }

  removeLikeNotification(tweetId): Observable<any> {
    const senderId = this.authService.getUserId();
    const url = BACKEND_URL + tweetId + "/like/" + senderId;

    return this.http.delete(url).pipe(
      catchError((error) => {
        let notification: Notification = {
          type: 'like',
          message: 'ok',
          timestamp: new Date(),
          read: false,
          senderId: {
            fname: '',
            lname: ' ',
            username: ''
          },
          targetId: {
            _id: '',
            text: '',
            username: '',
            author: ''
          }
        };
        this.notifications.push(notification);
        this.notificationsUpdateListener.next(this.notifications);
        return throwError(error);
      })
    );
  }

  removeCommentNotification(tweetId) {
    const senderId = this.authService.getUserId();
    const url = BACKEND_URL + tweetId + "/reply/" + senderId;

    return this.http.delete(url).pipe(
      tap(() => {
        // Remove the notification from the notifications array
        this.notifications = this.notifications.filter(n => n.targetId._id !== tweetId);
        this.notificationsUpdateListener.next(this.notifications);
        // console.log("notification removed successfully!!!");
      }),
      catchError((error) => {
        // Handle the error and emit a new notification
        const notification: Notification = {
          type: 'reply',
          message: `Failed to remove comment notification for tweet ${tweetId}`,
          timestamp: new Date(),
          read: false,
          senderId: {
            fname: '',
            lname: '',
            username: ''
          },
          targetId: {
            _id: tweetId,
            text: '',
            username: '',
            author: ''
          }
        };
        this.notifications.push(notification);
        this.notificationsUpdateListener.next(this.notifications);
        return throwError(error);
      })
    );
  }


  async updateNotifications() {
    if (this.isUpdatingNotifications) {
      return;
    }
    this.isUpdatingNotifications = true;

    const url = BACKEND_URL + "readAll";
    let result;

    try {
      result = await this.http.put(url, { notifications: this.notifications }).toPromise();
      this.notifications = result;
      this.notificationsUpdateListener.next(this.notifications);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.isUpdatingNotifications = false;
    }
  }

}

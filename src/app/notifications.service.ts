import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Notification } from './notification.modal';

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
    const url = "http://localhost:3000/api/notifications/" + username
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
    const url = "http://localhost:3000/api/notifications/" + tweetId + "/like"
    const senderId = this.authService.getUserId();

    const like = {
      senderId: senderId,
      targetId: tweetId
    }

    return this.http.post(url, like)
      // .pipe(
      //   tap((result: any) => {
      //     if (result.tweetDetails.targetId.creatorId != senderId) {
      //       this.notifications.push(result.notification);
      //       this.notificationsUpdateListener.next(this.notifications);
      //     }
      //   }),
      //   catchError((error) => {
      //     this.notifications.pop();
      //     this.notificationsUpdateListener.next(this.notifications);
      //     return throwError(error);
      //   })
      // );
  }

  sendReplyNotification(tweetId) {
    const url = "http://localhost:3000/api/notifications/" + tweetId + "/reply"
    const senderId = this.authService.getUserId();

    const reply = {
      senderId: senderId,
      targetId: tweetId
    }
    // return this.http.post(url, reply);
    return this.http.post(url, reply).pipe(
      tap((result: any) => {
        this.notifications.push(result.notification);
        this.notificationsUpdateListener.next(this.notifications);
      }),
      catchError((error) => {
        this.notifications.pop();
        this.notificationsUpdateListener.next(this.notifications);
        return throwError(error);
      })
    );
  }

  removeLikeNotification(tweetId): Observable<any> {
    const senderId = this.authService.getUserId();
    const url = `http://localhost:3000/api/notifications/${tweetId}/like/${senderId}`;

    // this.notifications.pop();
    // this.notificationsUpdateListener.next(this.notifications);

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


  async updateNotifications() {
    if (this.isUpdatingNotifications) {
      return;
    }
    this.isUpdatingNotifications = true;

    const url = "http://localhost:3000/api/notifications/readAll";
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, Observable, of, Subject } from 'rxjs';

import { Profile } from './profile.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;

  constructor(private http: HttpClient, private router: Router) {

  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener;
  }

  createUser(user: Profile) {
    this.http.post("http://localhost:3000/api/user/signup", user).subscribe({
      next: (response: any) => {
        console.log(response.message)
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  login(username: string, password: string) {
    let userdata = {
      username: username,
      password: password
    }
    return this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", userdata)
      .pipe(mergeMap(
        (response) => {
          const token = response.token
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.tokenTimer = setTimeout(() => {
              this.logout();
            }, expiresInDuration * 1000)

            this.authStatusListener.next(true)
            this.isAuthenticated = true;
            this.router.navigate(['home/feed']);
          }
          return of(response)

        }
      ))
  }



  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer);
    this.router.navigate(['welcome/login']);

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, Observable, of, Subject } from 'rxjs';

import { Profile } from './profile.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string
  private authStatusListener = new Observable<any>();

  constructor(private http: HttpClient, private router: Router) {

  }

  getToken() {
    return this.token;
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
    return this.http.post<{ token: string }>("http://localhost:3000/api/user/login", userdata)
      .pipe(mergeMap(
        (response) => {
          const token = response.token
          this.token = token;
          this.authStatusListener = of(true);
          this.router.navigate(['home/feed']);
          return of(response)

        }
      ))
  }

}

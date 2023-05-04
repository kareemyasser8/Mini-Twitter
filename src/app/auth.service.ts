import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, Observable, of, Subject } from 'rxjs';

import { Profile } from './profile.modal';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + "user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private userFullName: string
  private userFullNameListener = new Subject<string>();
  private username: string
  private usernameListner = new Subject<string>();
  private userId: string;

  private users: Profile[] = [];
  private usersUpdateListener = new Subject<Profile[]>();

  constructor(private http: HttpClient, private router: Router) {

  }

  fetchProfile(username: string){
    return this.http.get(BACKEND_URL + username)
  }

  getProfiles(){
     this.http.get<{message: string, users: Profile[]}>(BACKEND_URL).subscribe({
      next: (response)=>{
          if(!response) return
          this.users = response.users;
          this.usersUpdateListener.next(this.users)
      },
      error: (err)=>{
        console.log(err);
      }
     })
  }

  getUsersUpdateListener(): Observable<Profile[]>{
    return this.usersUpdateListener.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener;
  }

  createUser(user: Profile) {
    return this.http.post(BACKEND_URL + "signup", user)
  }

  login(username: string, password: string) {
    let userdata = {
      username: username,
      password: password
    }
    return this.http.post<{ token: string, expiresIn: number }>(BACKEND_URL+ "login", userdata)
      .pipe(mergeMap(
        (response) => {
          const token = response.token
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration)
            this.authStatusListener.next(true)
            this.isAuthenticated = true;

            this.decodeNameFromToken(token)

            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
            // console.log(expirationDate);
            this.saveAuthData(token, expirationDate)
            this.router.navigate(['home/feed']);
          }
          return of(response)

        }
      ))
  }



  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false)
    this.userFullName = "";
    this.userFullNameListener.next("");
    this.username = "";
    this.usernameListner.next("");
    this.userId = "";
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['welcome/login']);

  }

  autoAuthUser() {
    const authInformation = this.getAuthData()
    const now = new Date();
    let expiresIn: number;
    let token = ""
    if (authInformation) {
      expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      token = authInformation.token

      if (expiresIn > 0) {
        this.token = authInformation.token
        this.setAuthTimer(expiresIn / 1000)
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
    }
  }

  decodeNameFromToken(token: string){
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const author = decodedPayload.userFullName;
    const username = decodedPayload.username;
    const userId = decodedPayload.userId;

    this.userId = userId;

    this.username = username;
    // this.usernameListner.next(username);

    this.userFullName = author;
    // this.userFullNameListener.next(author);
  }


  getUsername(){
    return this.username;
  }

  getUsernameListner(): Observable<string>{
    return this.usernameListner;
  }


  getUserFullName(){
    return this.userFullName;
  }

  getUserFullNameListener(): Observable<string>{
    return this.userFullNameListener;
  }

  private getAuthData(): void | { token: string, expirationDate: Date } {
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    if (!token && !expirationDate) {
      return
    }
    else {
      this.decodeNameFromToken(token)
      return {
        token: token,
        expirationDate: new Date(expirationDate)
      }
    }
  }


  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  private clearAuthData() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
  }


}

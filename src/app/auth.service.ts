import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from './profile.modal';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {

  }

  createUser(user: Profile) {
    this.http.post("http://localhost:3000/api/user/signup", user).subscribe({
      next: (response:any)=>{
          console.log(response.message)
      },
      error: (err:any)=>{
        console.log(err)
      }
    })
  }

}

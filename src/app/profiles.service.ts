import { Profile } from './profile.modal';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  profiles: Profile[] = [
    {
       username: "ky8",
       password: "123",
       authorFname: "Kareem",
       authorLname: "Yassr",
       tweets: [],
       notifications: []
      }
  ]

  constructor(private router: Router) { }

  createNewAccount(profile:any){
    const account: Profile ={
      username: profile.username,
      password: profile.password,
      authorFname: profile.fname,
      authorLname: profile.lname,
      tweets: [],
      notifications: []
    }

    this.profiles.push(account)
    this.router.navigate(['/welcome/login']);

    console.log(this.profiles);
  }

  login(){

  }

  getProfiles(){
    return this.profiles;
  }

}

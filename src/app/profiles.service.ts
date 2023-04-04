import { Profile } from './profile.modal';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TweetsService } from './tweets.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  profiles: Profile[] = [
    {
      username: "ky8",
      password: "123",
      authorFname: "Kareem",
      authorLname: "Yasser",
      tweets: [],
      notifications: []
    }
  ]

  constructor(private router: Router, private tweetsService: TweetsService) { }

  createNewAccount(profile: any) {
    const account: Profile = {
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

  getProfileWithUserName(username: string) {
    let foundedProfile = this.profiles.filter(p => { p.username === username })
    console.log(foundedProfile[0])
    return foundedProfile[0];
  }

  login() {

  }

  getProfiles() {
    return this.profiles;
  }

}

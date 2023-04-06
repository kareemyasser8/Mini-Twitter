import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.modal';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  submitted: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(profileData: NgForm) {
    if (profileData.invalid) {
      return
    }
    let newUser: Profile = {
      username: profileData.value.username,
      password: profileData.value.password,
      fname: profileData.value.fname,
      lname: profileData.value.lname,
      tweets: [],
      notifications: []
    }
    this.authService.createUser(newUser)
  }

}

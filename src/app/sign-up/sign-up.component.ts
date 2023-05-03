import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  submitted: boolean = false
  isloading: boolean = false;
  error: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(profileData: NgForm) {
    this.isloading = true;
    if (profileData.invalid) {
      this.isloading = false;
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
    this.authService.createUser(newUser).subscribe({
      next: () => { this.isloading = false; this.router.navigate(['/welcome/login']) },
      error: (err) => { if(err) console.log(err); this.isloading = false }
    })

  }

}

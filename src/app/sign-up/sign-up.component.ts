import { NgForm } from '@angular/forms';
import { ProfilesService } from './../profiles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private profileService: ProfilesService) { }

  ngOnInit(): void {
  }

  register(profileData: NgForm){
    this.profileService.createNewAccount(profileData.value)
  }

}

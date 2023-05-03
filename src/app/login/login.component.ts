import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false
  isloading: boolean = false;
  failedResponse: boolean = false;

  constructor(private authService: AuthService) { }

  login(form: NgForm) {
    this.failedResponse = false;
    if (form.invalid) return
    this.isloading = true
    this.authService.login(form.value.username, form.value.password).subscribe({
      next: (token) => {
        this.isloading = false;
        // console.log(token)
      },
      error: (err) => {
        console.log(err);
        this.isloading = false;
        this.failedResponse = true
      }
    })
  }

  ngOnInit(): void {
  }

}

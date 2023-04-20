import { Subscription } from 'rxjs';
import { TweetsService } from './../tweets.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Profile } from '../profile.modal';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  fetchedProfiles: Profile[] = [];
  filteredProfiles: Profile[]

  profilesSubsciption: Subscription
  displayedFullUserName: string
  firstName: string
  username: string;

  searching = false;
  focusOnList = false;

  userIsAuthenticated: boolean
  authSubscription: Subscription;
  fullNameSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onLogOut() {
    this.authService.logout();
  }

  filter(query: string) {
    this.filteredProfiles = (query) ?
      this.fetchedProfiles.filter(t =>
        t.fname.toLowerCase().includes(query.toLowerCase()) ||
        t.lname.toLowerCase().includes(query.toLowerCase())
      ) : [];
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.fullNameSubscription.unsubscribe();
  }

  goToUserProfile(a) {
  let url = "home/profile/" + a.username;
   this.router.navigate([url])
  }


  ngOnInit(): void {
    this.authService.getProfiles();
    this.profilesSubsciption = this.authService.getUsersUpdateListener().subscribe({
      next: (profiles: Profile[]) =>{
        this.filteredProfiles = this.fetchedProfiles = profiles;
      }
    })

    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authSubscription = this.authService.getAuthStatusListener().subscribe({
      next: (value) => {
        this.userIsAuthenticated = value;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.username = this.authService.getUsername();
    this.displayedFullUserName = this.authService.getUserFullName();
    if(this.displayedFullUserName){
      this.firstName = this.displayedFullUserName.split(' ')[0]
    }

    this.fullNameSubscription = this.authService.getUserFullNameListener().subscribe({
      next: (value) => {
        // console.log("the displayed name: ", value)
      },
      error: (err) => { console.log(err) }
    })
  }


}

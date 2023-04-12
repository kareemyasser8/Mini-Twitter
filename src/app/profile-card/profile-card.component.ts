import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() user$: Observable<any>
  @Input() tweets$: Observable<any>

  constructor() {

   }



  ngOnInit(): void {
  }

}

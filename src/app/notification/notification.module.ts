import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { NotificationTimeAgoPipe } from '../notification-time-ago.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { NotificationsPageComponent } from '../notifications-page/notifications-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotificationCardComponent,
    NotificationTimeAgoPipe,
    NotificationsPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,
    SharedModule
  ],

  exports:[
    NotificationCardComponent,
    NotificationTimeAgoPipe,
    NotificationsPageComponent,
  ]
})
export class NotificationModule { }

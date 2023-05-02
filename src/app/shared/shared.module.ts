import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { EmptyTweetsComponent } from '../empty-tweets/empty-tweets.component';
import { GuestInstructionsComponent } from '../guest-instructions/guest-instructions.component';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    EmptyTweetsComponent,
    SearchBarComponent,
    HomeComponent,
    NavBarComponent,
    GuestInstructionsComponent,
    ErrorDialogComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,
  ],
  exports: [
    EmptyTweetsComponent,
    SearchBarComponent,
    HomeComponent,
    NavBarComponent,
    GuestInstructionsComponent,
    ErrorDialogComponent,
  ]
})
export class SharedModule { }

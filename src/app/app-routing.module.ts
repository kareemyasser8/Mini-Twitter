import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Home route
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

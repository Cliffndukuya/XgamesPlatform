import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

const routes: Routes = [

{path: 'homepage', component: HomepageComponent},
{path: '', component: HomepageComponent},
{path: 'login', component: LoginComponent},
{path: 'admin', component: AdminHomeComponent},
{path: 'user', component: UserHomeComponent},
{path: 'register', component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

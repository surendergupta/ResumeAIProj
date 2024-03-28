import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddresumeComponent } from './addresume/addresume.component';
import { AddsubscriptionComponent } from './addsubscription/addsubscription.component';
import { BuilderComponent } from './builder/builder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MyresumesComponent } from './myresumes/myresumes.component';
import { PrintresumeComponent } from './printresume/printresume.component';
import { PuppeterprintComponent } from './puppeterprint/puppeterprint.component';
import { LoggedInGuard } from './routeguards/LoggedInGuard';
import { LoggedOutGuard } from './routeguards/LoggedOutGuard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{path:"",pathMatch:"full",component:HomeComponent,canActivate:[LoggedOutGuard]},
{path:"dashboard",component:DashboardComponent,canActivate:[LoggedInGuard]},
{path:"signup",component:SignupComponent,canActivate:[LoggedOutGuard]},
{path:'signin',component:SigninComponent,canActivate:[LoggedOutGuard]},
{path:'user/myResumes',component:MyresumesComponent,canActivate:[LoggedInGuard]},
{path:'user/createResume',component:AddresumeComponent,canActivate:[LoggedInGuard]},
{path:'showResume',component:BuilderComponent},
{path:'user/addSubscription',component:AddsubscriptionComponent,canActivate:[LoggedInGuard]},
{path:'printResume',component:PrintresumeComponent,canActivate:[LoggedInGuard]},
{path:'puppeter',component:PuppeterprintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

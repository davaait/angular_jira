import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {Routes} from "./routes";
import {MainComponent} from "./main/main.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {TermsofserviceComponent} from "./termsofservice/termsofservice.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {MysettingsComponent} from "./mysettings/mysettings.component";
import {AuthComponent} from "./auth/auth.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {EditTaskWindowComponent} from "./edit-task-window/edit-task-window.component";
import {EditListWindowComponent} from "./edit-list-window/edit-list-window.component";

const routes: Route[] = [
  {
    path: '', redirectTo: '/' + Routes.MAIN, pathMatch: 'full'
  },
  {
    path: Routes.MAIN, component: MainComponent, canActivate: [AuthGuard],
    children: [{
      path: 'task/:id',
      component: EditTaskWindowComponent,
      canActivate: [AuthGuard]
    },
      {
      path: 'group/:name',
      component: EditListWindowComponent,
      canActivate: [AuthGuard]
    }
    ]
  },
  {
    path: Routes.PROFILE, component: MysettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: Routes.LOGIN, component: AuthComponent
  },
  {
    path: Routes.SIGNUP, component: SignUpComponent
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

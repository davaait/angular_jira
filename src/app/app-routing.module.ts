import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {Routes} from "./routes";
import {MainComponent} from "./main/main.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {TermsofserviceComponent} from "./termsofservice/termsofservice.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {MysettingsComponent} from "./mysettings/mysettings.component";
import {AuthComponent} from "./auth/auth.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Route[] = [
  {
    path: Routes.MAIN, component: MainComponent, canActivate: [AuthGuard]
  },
  {
    path: Routes.PRIVACY, component: PrivacyComponent, canActivate: [AuthGuard]
  },
  {
    path: Routes.TERMS, component: TermsofserviceComponent, canActivate: [AuthGuard]
  },
  {
    path: Routes.MYSETTINGS, component: MysettingsComponent, canActivate: [AuthGuard]
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
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {Routes} from "./routes";
import {AppComponent} from "./app.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Route[] = [
  {
    path: Routes.MAIN,
    component: AppComponent
  },
  {
    path: Routes.LOGIN,
    component: AuthComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

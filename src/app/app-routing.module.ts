import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {Routes} from "./routes";
import {AuthGuard} from "./services/auth/auth.guard";
import {MysettingsComponent} from "./mysettings/mysettings.component";
import {AuthComponent} from "./auth/auth.component";
import {EditTaskWindowComponent} from "./edit-task-window/edit-task-window.component";
import {EditListWindowComponent} from "./edit-list-window/edit-list-window.component";
import {BoardComponent} from "./board/board.component";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Route[] = [
  {
    path: '', redirectTo: '/' + Routes.WELCOME, pathMatch: 'full'
  },
  {
    path: Routes.BOARD + "/:id", component: BoardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'task/:id',
        component: EditTaskWindowComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'group/:name',
        component: EditListWindowComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: Routes.PROFILE, component: MysettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: Routes.LOGIN, component: AuthComponent
  },
  {
    path: Routes.WELCOME, component: WelcomeComponent, canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

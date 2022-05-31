import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {Routes} from "./routes";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {MysettingsComponent} from "./mysettings/mysettings.component";
import {AuthComponent} from "./auth/auth.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {EditTaskWindowComponent} from "./edit-task-window/edit-task-window.component";
import {EditListWindowComponent} from "./edit-list-window/edit-list-window.component";
import {BoardComponent} from "./board/board.component";

const routes: Route[] = [
  {
    path: '', redirectTo: '/' + Routes.PROFILE, pathMatch: 'full'
  },
  // {
  //   path: Routes.BOARD, component: MainComponent, canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'task/:id',
  //       component: EditTaskWindowComponent,
  //       canActivate: [AuthGuard]
  //     },
  //     {
  //       path: 'group/:name',
  //       component: EditListWindowComponent,
  //       canActivate: [AuthGuard]
  //     },
  //   ]
  // },
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

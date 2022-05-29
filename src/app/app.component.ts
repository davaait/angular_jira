import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {Board, FireBaseUser} from "./services/types";
import {Routes} from "./routes";
import {ListWindowComponent} from "./list-window/list-window.component";
import {MatDialog} from "@angular/material/dialog";
import {BoardWindowComponent} from "./board-window/board-window.component";
import {Observable} from "rxjs";
import {CrudService} from "./services/crud/crud.service";
import {Collections} from "./services/crud/collections";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title: string = 'my_project';
  public user: FireBaseUser = null;
  public routes: typeof Routes= Routes;
  public board$: Observable<Board[]> = this.crudService.handleData(Collections.BOARDS);
  public boardsCollection: Board[] = [];

  constructor(public authService: AuthService,
              public router: Router,
              public dialog: MatDialog,
              private crudService: CrudService,
              ) {}

  public ngOnInit() {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
  }

  public login(): void {
    this.authService.googleSignIn().subscribe()
  }

  public signOut(): void {
    this.authService.signOut().subscribe()
  }

  public openBoardComp() {
    this.dialog.open(BoardWindowComponent);
  }
}

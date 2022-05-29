import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {Board, BoardStore, FireBaseUser, User, UserStore} from "./services/types";
import {Routes} from "./routes";
import {MatDialog} from "@angular/material/dialog";
import {BoardWindowComponent} from "./board-window/board-window.component";
import {Observable, switchMap, tap} from "rxjs";
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
  public routes: typeof Routes = Routes;
  public board$: Observable<BoardStore[]> = this.crudService.handleData(Collections.BOARDS);
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);
  public users: UserStore[] = [];
  public usersId: any[] = [];
  public boardsCollection: Board[] = [];

  constructor(public authService: AuthService,
              public router: Router,
              public dialog: MatDialog,
              private crudService: CrudService,
  ) {
  }

  public ngOnInit() {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value;
      let newUser: User = {
        name: this.user?.displayName,
        userId: this.user?.uid,
        avatarUrl: this.user?.photoURL,
      }
      if (this.usersId.includes(this.user?.displayName)) {
        this.crudService.createObject(Collections.USERS, newUser).subscribe();
      }
      console.log(this.usersId, this.user?.uid)
    })
    this.users$.subscribe((u) => {
      this.users = u as UserStore[];
      this.users.forEach((f) => {
        if (!this.usersId.includes(f.name)) {
          this.usersId.push(f.name)
        }
      })
      console.log(this.usersId)
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

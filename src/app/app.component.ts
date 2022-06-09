import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {BoardStore, FireBaseUser, User, UserStore} from "./services/types";
import {Routes} from "./routes";
import {MatDialog} from "@angular/material/dialog";
import {BoardWindowComponent} from "./board-window/board-window.component";
import {delay, Observable, tap} from "rxjs";
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
  public default?: string;
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);
  public users: User[] = [];
  public allIds?: any[] = [];
  public filteredBoards?: BoardStore[];

  constructor(public authService: AuthService,
              public router: Router,
              public dialog: MatDialog,
              private crudService: CrudService,
  ) {
  }

  public ngOnInit() {
    this.users$.subscribe((u) => {
      this.users = u as User[];
      this.users.forEach((f) => {
        if (!this.allIds?.includes(f.userId)) {
          this.allIds?.push(f.userId)
        }
      })
    })
    this.authService.user$.pipe(
      tap((value) => {
        this.user = value;
      }),
      delay(1200)
    ).subscribe((val) => {
      let newUser: User = {
        name: this.user?.displayName,
        userId: this.user?.uid,
        avatarUrl: this.user?.photoURL,
      }
      if (!this.allIds?.includes(this.user?.uid)) {
        this.crudService.createObject(Collections.USERS, newUser).subscribe();
      }
    })
    this.board$.subscribe(
      (value) => {
        this.filteredBoards = value.filter((f) => f.activeUsers?.includes(this.user?.uid!))
      })
  }

  public removeBoard(id: string): void {
    this.crudService.deleteObject(Collections.BOARDS, id).subscribe()
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

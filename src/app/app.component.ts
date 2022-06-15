import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {BoardStore, FireBaseUser, User, UserStore} from "./services/types";
import {Routes} from "./routes";
import {MatDialog} from "@angular/material/dialog";
import {BoardWindowComponent} from "./board-window/board-window.component";
import {Observable, Subscription, switchMap, tap} from "rxjs";
import {CrudService} from "./services/crud/crud.service";
import {Collections} from "./services/crud/collections";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public title: string = 'my_project';
  public user: FireBaseUser = null;
  public routes: typeof Routes = Routes;
  public board$: Observable<BoardStore[]> = this.crudService.handleData(Collections.BOARDS);
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);
  public default?: string;
  public users: User[] = [];
  public allIds?: string[] = [];
  public filteredBoards?: BoardStore[];
  private subscriptions: Subscription[] = [];

  constructor(public authService: AuthService,
              public router: Router,
              public dialog: MatDialog,
              private crudService: CrudService,
  ) {
  }

  public ngOnInit() {
    let filterUsers = this.users$.pipe(
      tap((value) => {
        this.allIds = [];
        value.forEach((user) => {
          this.allIds?.push(user.userId!)
        })
      })
    )
    this.subscriptions.push(
      this.authService.user$.pipe(
        tap((u) => {
          this.user = u;
        }),
        switchMap(() => filterUsers)
      ).subscribe((value) => {
        let newUser: User = {
          name: this.user?.displayName,
          userId: this.user?.uid,
          avatarUrl: this.user?.photoURL,
        }
        if (!this.allIds?.includes(this.user?.uid!)) {
          this.crudService.createObject(Collections.USERS, newUser).subscribe()
        }
      }),
      this.board$.subscribe(
        (value) => {
          this.filteredBoards = value.filter((f) => f.activeUsers?.includes(this.user?.uid!))
        })
    )
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

  public ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

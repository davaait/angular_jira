import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {BoardStore, FireBaseUser, TasksStore, UserStore} from "../services/types";
import {Observable, Subscription, switchMap, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogWindowComponent} from "../dialog-window/dialog-window.component";
import {ListWindowComponent} from "../list-window/list-window.component";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {GetIdService} from "../services/get-value/get-id.service";
import {NewAssignedWindowComponent} from "../new-assigned-window/new-assigned-window.component";

type IconsNameType = {
  add: string,
  addCircleOutline: string
}
type ButtonTextType = {
  create: string,
  addTask: string
}

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit, OnDestroy {

  @Input() board?: BoardStore;

  public iconsName: IconsNameType = {
    add: 'add',
    addCircleOutline: 'add_circle_outline'
  }
  public buttonText: ButtonTextType = {
    create: 'Create List',
    addTask: 'Add New Task'
  }
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public users$: Observable<UserStore[]> = this.crudService.handleData<UserStore>(Collections.USERS);
  public user: FireBaseUser = null;
  private subscriptions: Subscription[] = [];
  private boardId: string = "";
  private allBoards: BoardStore[] = [];
  public allUsers: UserStore[] = [];
  public allUsersID: string[] = [];

  constructor(private crudService: CrudService,
              public dialog: MatDialog,
              private authService: AuthService,
              private getIdService: GetIdService,
  ) {
  }

  public ngOnInit(): void {
    let getUsers = this.users$.pipe(
      tap((value) => {
        this.allUsers = value.filter((f) => this.allBoards[0].activeUsers.includes(f.userId!))
        this.allUsers.forEach((f) => {
          if (!this.allUsersID.includes(f.userId!)) {
            this.allUsersID.push(f.userId!)
          } else return
        })
      })
    )
    getUsers.subscribe()
    let getBoards = this.crudService.handleData<BoardStore>(Collections.BOARDS).pipe(
      tap((value) => {
        this.allBoards = value.filter((f) => f.id === this.boardId)
      })
    )
    this.subscriptions.push(
      this.getIdService.idValue$.pipe(
        tap((value) => {
          this.boardId = value;
        }),
        switchMap(() => getBoards),
        switchMap(() => getUsers),
      ).subscribe(),
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
  }

  public newAssignedUser(): void {
    this.dialog.open(NewAssignedWindowComponent, {data: {boardID: this.boardId, assignedUsers: this.allUsersID}});
  }

  public openDialog() {
    this.dialog.open(DialogWindowComponent, {data: {boardID: this.board?.id}});
  }

  public openListWindow() {
    this.dialog.open(ListWindowComponent, {data: {boardID: this.board?.id}});
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

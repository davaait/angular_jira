import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {BoardStore, FireBaseUser, TasksStore} from "../services/types";
import {Observable, Subscription, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogWindowComponent} from "../dialog-window/dialog-window.component";
import {ListWindowComponent} from "../list-window/list-window.component";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {Params} from "@angular/router";
import {GetIdService} from "../services/get-value/get-id.service";

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
  public progressValue?: number;
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;
  private urlID: string = "";
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              public dialog: MatDialog,
              private authService: AuthService,
              private getIdService: GetIdService,
  ) {
  }

  public ngOnInit(): void {
    this.getIdService.idValue$.subscribe((value) => {
      this.urlID = value
      console.log(this.urlID)
    })
    this.subscriptions.push(
      this.tasks$.pipe(
        tap((taskArray) => {
          let afterFilterTasks = taskArray.filter((f) =>
            f.activeUser === this.user?.uid
            && f.boardID === this.urlID
          )
          let completedTasks = taskArray.filter((t) =>
            t.group === "Completed"
            && this.user?.uid
            && this.user?.uid === t.activeUser
            && t.boardID === this.urlID
          );
          console.log(afterFilterTasks, completedTasks)
          this.progressValue = Math.round((completedTasks.length / afterFilterTasks.length) * 100);
        })
      ).subscribe(),
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
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

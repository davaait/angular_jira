import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {TasksStore} from "../services/types";
import {Observable, Subscription, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogWindowComponent} from "../dialog-window/dialog-window.component";
import {ListWindowComponent} from "../list-window/list-window.component";

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
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.tasks$.pipe(
        tap((taskArray) => {
          const completedTasks = taskArray.filter((t) => t.group === "Completed");
          this.progressValue = Math.round((completedTasks.length / taskArray.length) * 100);
        })
      ).subscribe()
    )
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogWindowComponent);
  }

  public openListWindow() {
    const dialogRef = this.dialog.open(ListWindowComponent);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

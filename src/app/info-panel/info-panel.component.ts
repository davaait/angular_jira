import {Component} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {TasksStore} from "../services/types";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogWindowComponent} from "../dialog-window/dialog-window.component";
import {ListWindowComponent} from "../list-window/list-window.component";

type IconsNameType = {
  add: string,
  add_circle_outline: string
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
export class InfoPanelComponent {

  public iconsName: IconsNameType = {
    add: 'add',
    add_circle_outline: 'add_circle_outline'
  }

  public buttonText: ButtonTextType = {
    create: 'Create List',
    addTask: 'Add New Task'
  }

  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);

  constructor(private crudService: CrudService,
              public dialog: MatDialog
  ) {
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public openListWindow() {
    const dialogRef = this.dialog.open(ListWindowComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

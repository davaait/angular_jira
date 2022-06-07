import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable} from "rxjs";
import {FireBaseUser, List, TasksStore} from "../services/types";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskWindowComponent} from "../edit-task-window/edit-task-window.component";
import {EditListWindowComponent} from "../edit-list-window/edit-list-window.component";
import {TaskDetailsComponent} from "../task-details/task-details.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  //TODO change types
  @Input() itemName?: any;
  @Input() genColor?: string;
  @Input() itemsArray?: TasksStore[];
  @Input() itemID?: any;
  @Input() group?: List;
  @Input() user?: FireBaseUser;

  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public lists: List[] = [];

  constructor(private crudService: CrudService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.crudService.handleData<List>(Collections.GROUP).subscribe((value) => {
      this.lists = value;
    })
  }

  public update(id: string): void {
    const task: any = {
      name: "C++"
    }
    this.crudService.updateObject(Collections.TASKS, id, task).subscribe()
  }

  public delete(id: string): void {
    this.crudService.deleteObject(Collections.TASKS, id).subscribe();
  }

  //TODO: remove tasks from firebase collection in the same time with removing list
  public removeList(id: string): void {
    this.crudService.deleteObject(Collections.GROUP, id).subscribe();
  }

  public editWindow(t: TasksStore): void {
    this.dialog.open(EditTaskWindowComponent, {data: {currentTask: t}});
  }

  public editListWindow(l: List | undefined): void {
    this.dialog.open(EditListWindowComponent, {data: {currentList: l}})
  }

  public openTaskDetailsWindow(t: TasksStore): void {
    this.dialog.open(TaskDetailsComponent, {data: {item: t}})
  }

  private receiveData(id: string): string {
    let l = this.lists.filter((f) => f.id === id)
    return l[0].name
  }

  // DragNDrop function
  drop(event: CdkDragDrop<TasksStore[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    let prevName = this.receiveData(event.previousContainer.id);
    let currName = this.receiveData(event.container.id);
    this.crudService.updateObject(Collections.TASKS, event.item.data.id, {
      group: event.container.id,
      history: [this.user?.displayName + ' change group from ' + prevName + ' to ' + currName, ...event.item.data.history]
    })
  }
}

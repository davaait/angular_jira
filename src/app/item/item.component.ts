import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, tap} from "rxjs";
import {List, TasksStore} from "../services/types";
import {ListWindowComponent} from "../list-window/list-window.component";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskWindowComponent} from "../edit-task-window/edit-task-window.component";
import {ActivatedRoute} from "@angular/router";

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

  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public tID?: string;

  constructor(private crudService: CrudService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tID = params['id']
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
  public removeList(id: string | undefined): void {
    this.crudService.deleteObject(Collections.GROUP, id).subscribe();
  }

  public editWindow(t: TasksStore) {
    this.dialog.open(EditTaskWindowComponent, {data: {currentTask: t, currentTaskID: this.tID}});
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
    this.crudService.updateObject(Collections.TASKS, event.item.data.id, {group: event.container.id})
  }
}

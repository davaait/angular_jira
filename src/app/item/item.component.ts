import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable} from "rxjs";
import {TasksStore} from "../services/types";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() itemName?: string;
  @Input() genColor?: string;
  @Input() itemsArray?: TasksStore[];
  @Input() itemID?: string;

  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);

  constructor(private crudService: CrudService) {
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

  // DragNDrop function
  drop(event: CdkDragDrop<TasksStore[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log()
    } else {
      console.log(event.container.id, event.previousContainer.id)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.crudService.updateObject(Collections.TASKS, event.item.data.id, {group: "Completed"})
    // const task = {
    //   // id: event.container.id
    //   group: event.item.data.group
    // }
    // this.crudService.updateObject(Collections.TASKS, event.item.data.id, task)
    // event.item.data.id = event.container.id
    // const tasks = {
    //   group: event.container.id,
    // }
    // this.crudService.updateObject(Collections.TASKS, event.item.data.id, tasks)
    // event.item.data.id = event.container.id;
    // console.log(event.item.data.id, event.container.id)
  }

  ngOnInit(): void {
  }
}

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
export class ItemComponent {

  @Input() itemName?: string;
  @Input() genColor?: string;
  @Input() arrayList?: string[];

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

  // DragNDrop function
  drop(event: CdkDragDrop<string[]>) {
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
  }
}

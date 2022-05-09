import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable} from "rxjs";
import {List, TasksStore} from "../services/types";

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

  ngOnInit(): void {
  }
}

import {Component} from '@angular/core';
import firebase from "firebase/compat/app";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Task, TasksStore} from "../services/types";
import DocumentReference = firebase.firestore.DocumentReference;
import {Observable} from "rxjs";

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

  constructor(private crudService: CrudService) {
  }

  public getData(): void {
    this.crudService.getDate(Collections.TASKS).subscribe()
}

  public update(id: string): void {
    const task: Task = {
      taskName: 'BREAD',
      taskGroup: 'Completed'
    }
    this.crudService.updateObject(Collections.TASKS, id, task).subscribe();
  }

  public addTask(): any {
    const task: Task = {
      taskName: 'MILK',
      taskGroup: 'Pending'
    }
    this.crudService.createObject(Collections.TASKS, task).subscribe((value: DocumentReference<Task>) => console.log(value));
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<Task>(Collections.TASKS, id).subscribe(((value: Task | undefined) => console.log(value)));
  }

}

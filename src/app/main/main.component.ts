import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import DocumentReference = firebase.firestore.DocumentReference;
import {itemsArrayType} from "../app.component";
import {Observable} from "rxjs";
import {List, TasksStore} from "../services/types";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public groupsData: List[] = [];

  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);

  constructor(private crudService: CrudService) {
  }

  public addItem(): void {
    const task: any = {
      taskName: "react/redux",
      tasksCollection: "Pending"
    }
    this.crudService.createObject(Collections.TASKS, task).subscribe((value: DocumentReference<Task>) => console.log(value));
  }

  // Data arrays
  public pendingTodos: string[] = ['react/redux', 'JS', 'HTML/CSS']

  public completedTodos: string[] = ['.NET', 'Python']

  public inProgressTodos: string[] = ['Java']

  public reviewTodos: string[] = ['Kotlin', 'ReactNative', 'ObjectiveC', 'NodeJS', 'C++']

  public itemsArray: Array<itemsArrayType> = [
    {itemName: 'Pending', color: '#ef5350', array: []},
    {itemName: 'Completed', color: '#42a5f5', array: []},
    {itemName: 'Inprogress', color: '#4caf50', array: []},
    {itemName: 'Review', color: '#ff9b44', array: []},
  ]

  public spinnerValue: boolean = true

  ngOnInit() {
    this.crudService.getDate<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.groupsData = value;
      console.log(this.groupsData)
    })
    this.tasks.subscribe(task => {
      const tasks: TasksStore[] = task;
      this.groupsData.forEach((group: List) =>
        group.tasksArray = tasks.filter((filteredTask: TasksStore) => filteredTask.group === group.name)
      )
      console.log(this.groupsData);
    })
  }

}

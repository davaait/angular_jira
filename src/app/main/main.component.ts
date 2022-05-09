import {Component, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
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
  public lists: Observable<List[]> = this.crudService.handleData<List>(Collections.GROUP);

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    // this.crudService.getDate<List>(Collections.GROUP).subscribe((value: List[]) => {
    //   this.groupsData = value;
    // })
    this.crudService.handleData<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.groupsData = value;
    })
    this.tasks.subscribe(task => {
      const tasks: TasksStore[] = task;
      this.groupsData.forEach((group: List) => {
          group.tasksArray = tasks.filter((filteredTask: TasksStore) => filteredTask.group === group.name)
        }
      )
    })
  }
}

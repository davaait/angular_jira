import {Component, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, tap} from "rxjs";
import {List, TasksStore} from "../services/types";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public groupsData?: List[] | undefined;

  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public lists$: Observable<List[]> = this.crudService.handleData<List>(Collections.GROUP);

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    const updateTask: Observable<any> = this.tasks$.pipe(
      tap((task) => {
        const tasks: TasksStore[] = task;
        this.groupsData?.forEach((group: List) => {
            group.tasksArray = tasks.filter((filteredTask: TasksStore) => filteredTask.group === group.name)
            console.log('test')
          }
        )
      })
    );
    // this.context = this.sessionService.getItem(StorageConstants.DASHBOARD_CONTEXT) || {};
    this.crudService.handleData<List>(Collections.GROUP).pipe(
      tap(value => this.groupsData = value),
      switchMap(() => updateTask)
    ).subscribe()
  }
}

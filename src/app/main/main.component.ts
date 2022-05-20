import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, Subscription, tap} from "rxjs";
import {FireBaseUser, List, TasksStore} from "../services/types";
import {switchMap} from "rxjs/operators";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  public groupsData?: List[] | undefined;
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService
  ) {}

  public ngOnInit(): void {
    const updateTask: Observable<TasksStore[]> = this.tasks$.pipe(
      tap((task) => {
        const tasks: TasksStore[] = task;
        this.groupsData?.forEach((group: List) => {
            group.tasksArray = tasks.filter((filteredTask: TasksStore) => filteredTask.group === group.name
            )
          }
        )
      })
    );
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      }),
      this.crudService.handleData<List>(Collections.GROUP).pipe(
        tap(value => this.groupsData = value),
        switchMap(() => updateTask)
      ).subscribe()
    )
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}

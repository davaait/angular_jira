import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, Subscription, tap} from "rxjs";
import {FireBaseUser, List, TasksStore, User} from "../services/types";
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
  public filteredGroup?: List[];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public userColl$: Observable<User[]> = this.crudService.handleData<User>(Collections.USERS);
  public boards$: Observable<User[]> = this.crudService.handleData<User>(Collections.BOARDS);
  public user: FireBaseUser = null;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    const updateTask: Observable<TasksStore[]> = this.tasks$.pipe(
      tap((task) => {
        const tasks: TasksStore[] = task;
        this.filteredGroup?.forEach((group: List) => {
            group.tasksArray = tasks.filter((filteredTask: TasksStore) => filteredTask.group === group.name && filteredTask.activeUser === this.user?.uid
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
        tap(value => {
          this.groupsData = value
          this.filteredGroup = this.groupsData.filter((g) => g.activeUser === this.user?.uid)
        }),
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

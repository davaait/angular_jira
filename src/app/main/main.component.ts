import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, Subscription, tap} from "rxjs";
import {Board, BoardStore, FireBaseUser, List, TasksStore, User} from "../services/types";
import {switchMap} from "rxjs/operators";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() board?: BoardStore;
  @Input() filteredGroup?: List[];

  public groupsData?: List[] | undefined;
  // public filteredGroup?: List[];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;

  constructor(private crudService: CrudService,
              private authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    // const updateTask: Observable<TasksStore[]> = this.tasks$.pipe(
    //   tap((task) => {
    //     const tasks: TasksStore[] = task;
    //     this.filteredGroup?.forEach((group: List) => {
    //         group.tasksArray = tasks.filter((filteredTask: TasksStore) =>
    //           filteredTask.group === group.name
    //           && filteredTask.activeUser === this.user?.uid
    //           && filteredTask.boardID === this.board?.id
    //         )
    //       }
    //     )
    //   })
    // );
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
    // this.crudService.handleData<List>(Collections.GROUP).pipe(
    //   tap(value => {
    //     this.groupsData = value
    //     this.filteredGroup = this.groupsData.filter((g) => g.activeUser === this.user?.uid && g.boardID === this.board?.id)
    //   }),
    //   switchMap(() => updateTask)
    // ).subscribe()
  }

}

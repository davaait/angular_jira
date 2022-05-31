import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {BoardStore, FireBaseUser, List, TasksStore} from "../services/types";
import {Observable, switchMap, tap} from "rxjs";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private authService: AuthService,
  ) {
  }

  public board?: BoardStore;
  public groupsData?: List[] | undefined;
  public filteredGroup?: List[];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
    const updateTask: Observable<TasksStore[]> = this.tasks$.pipe(
      tap((task) => {
        const tasks: TasksStore[] = task;
        this.filteredGroup?.forEach((group: List) => {
            group.tasksArray = tasks.filter((filteredTask: TasksStore) =>
              filteredTask.group === group.name
              && filteredTask.activeUser === this.user?.uid
              && filteredTask.boardID === this.board?.id
            )
          }
        )
      })
    );
    let getBoard: Observable<BoardStore[]> = this.crudService.handleData<BoardStore>(Collections.BOARDS).pipe(
      tap((t) => {
        let newArr = t;
        let arr = newArr.filter((f) => f.id === id.id)
        this.board = arr[0]
        console.log(this.board)
      })
    )
    let filterAll: Observable<TasksStore[]> = this.crudService.handleData<List>(Collections.GROUP).pipe(
      tap(value => {
        this.groupsData = value
        this.filteredGroup = this.groupsData.filter((g) => g.activeUser === this.user?.uid && g.boardID === this.board?.id)
      }),
      switchMap(() => updateTask))
    let id: any;
    this.route.params.pipe(
      tap((s) => {
        id = s;
      }),
      switchMap(() => getBoard),
      switchMap(() => filterAll)
    ).subscribe()
  }

}

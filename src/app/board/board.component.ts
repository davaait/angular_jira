import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {BoardStore, FireBaseUser, List, TasksStore} from "../services/types";
import {Observable, switchMap, tap} from "rxjs";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {GetIdService} from "../services/get-value/get-id.service";

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
    private getIdService: GetIdService,
  ) {
  }

  public board?: BoardStore;
  public groupsData?: List[] | undefined;
  public filteredGroup?: List[];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;
  public id: Params = {};

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
    const updateTask: Observable<TasksStore[]> = this.tasks$.pipe(
      tap((task) => {
        const tasks: TasksStore[] = task;
        this.filteredGroup?.forEach((group: List) => {
            group.tasksArray = tasks.filter((filteredTask: TasksStore) =>
              filteredTask.group === group.id
              && this.board?.activeUsers?.includes(filteredTask.activeUser!)
              && filteredTask.boardID === this.board?.id
            )
          }
        )
      })
    );
    const getBoard: Observable<BoardStore[]> = this.crudService.handleData<BoardStore>(Collections.BOARDS).pipe(
      tap((t) => {
        let arr = t.filter((f) => f.id === this.id['id'])
        this.board = arr[0]
      })
    )
    const filterAll: Observable<TasksStore[]> = this.crudService.handleData<List>(Collections.GROUP).pipe(
      tap(value => {
        this.groupsData = value
        this.filteredGroup = this.groupsData.filter((g) =>
          g.boardID === this.board?.id
          && this.board?.activeUsers?.includes(g.activeUser!))
      }),
      switchMap(() => updateTask))
    this.route.params.pipe(
      tap((s) => {
        this.id = s;
        this.getIdService.changeIdValue(this.id['id'])
      }),
      switchMap(() => getBoard),
      switchMap(() => filterAll)
    ).subscribe()
  }

}

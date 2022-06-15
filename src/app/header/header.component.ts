import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {map, Observable, Subscription, tap} from "rxjs";
import {FormControl} from "@angular/forms";
import {startWith, switchMap} from "rxjs/operators";
import {BoardStore, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {AuthService} from "../services/auth/auth.service";
import {TaskDetailsComponent} from "../task-details/task-details.component";
import {MatDialog} from "@angular/material/dialog";

export type IconsNameType = {
  menu: string,
  settings: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public iconsName: IconsNameType = {
    menu: 'menu',
    settings: 'settings'
  }

  public myControl = new FormControl();
  public filteredOptions?: Observable<TasksStore[]>;
  public array: TasksStore[] = [];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  private boardsID: string[] = [];
  private subscriptions: Subscription[] = [];

  @Input() user?: firebase.User | null;
  @Input() fn?: () => void;

  constructor(private crudService: CrudService,
              private authService: AuthService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
    let getTasks = this.tasks$.pipe(
      tap((t) => {
        this.array = t.filter((f) =>
          this.boardsID.includes(f.boardID!)
          || f.activeUser === this.user?.uid
          || f.assignedUser === this.user?.displayName
        )
      }))
    this.crudService.handleData<BoardStore>(Collections.BOARDS).pipe(
      tap((s) => {
        let arr = s.filter((f) => f.activeUsers?.includes(this.user?.uid!))
        this.boardsID = [];
        arr.forEach((f) => this.boardsID.push(f.id))
      }),
      switchMap(() => getTasks)
    ).subscribe()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  public openTaskDetailsWindow(t: TasksStore): void {
    this.dialog.open(TaskDetailsComponent, {data: {item: t}})
  }

  private _filter(value: string): TasksStore[] {
    const filterValue = value.toLowerCase();
    return this.array.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

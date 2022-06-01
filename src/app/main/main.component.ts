import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, Subscription, tap} from "rxjs";
import {Board, BoardStore, FireBaseUser, List, TasksStore, User} from "../services/types";
import {switchMap} from "rxjs/operators";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() board?: BoardStore;
  @Input() filteredGroup?: List[];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;

  constructor(private crudService: CrudService,
              private authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
  }

}

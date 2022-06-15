import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Observable, Subscription} from "rxjs";
import {BoardStore, FireBaseUser, List, TasksStore} from "../services/types";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  @Input() board?: BoardStore;
  @Input() filteredGroup?: List[];
  public tasks$: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  public user: FireBaseUser = null;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

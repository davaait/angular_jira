import {Component, OnDestroy, OnInit} from '@angular/core';
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {Board} from "../services/types";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";

@Component({
  selector: 'app-mysettings',
  templateUrl: './mysettings.component.html',
  styleUrls: ['./mysettings.component.css']
})
export class MysettingsComponent implements OnInit, OnDestroy {

  public user: firebase.User | null = null;
  private board$: Observable<Board[]> = this.crudService.handleData(Collections.BOARDS);
  public boardsArray: Board[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private crudService: CrudService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.board$.subscribe((b) => {
        this.boardsArray = b as Board[];
      }),
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

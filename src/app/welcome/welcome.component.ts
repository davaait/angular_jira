import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {BoardStore, FireBaseUser} from "../services/types";
import firebase from "firebase/compat";
import {Observable, Subscription} from "rxjs";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {Router} from "@angular/router";
import {Routes} from "../routes";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  public user: FireBaseUser = null;
  public boards$: Observable<BoardStore[]> = this.crudService.handleData(Collections.BOARDS);
  public allBoards: BoardStore[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private crudService: CrudService,
              public router: Router,
  ) {
  }

  public goTo(id: string): void {
    this.router.navigate([Routes.BOARD, id])
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.boards$.subscribe((value) => {
        this.allBoards = value.filter((f) => f.activeUsers?.includes(this.user?.uid!))
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

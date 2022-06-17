import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardControl} from "../model/controls.enum";
import {Board, BoardStore, FireBaseUser, TasksStore, UserStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {Observable, Subscription, switchMap, tap} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GetIdService} from "../services/get-value/get-id.service";

type DialogData = {
  boardID: string,
  assignedUsers: string[],
}

@Component({
  selector: 'app-list-window',
  templateUrl: './new-assigned-window.component.html',
  styleUrls: ['./new-assigned-window.component.css']
})

export class NewAssignedWindowComponent implements OnInit, OnDestroy {

  public myForm: FormGroup = new FormGroup({});
  public formControls: typeof BoardControl = BoardControl;
  public user: FireBaseUser | null = null;
  public boards$: Observable<BoardStore[]> = this.crudService.handleData(Collections.BOARDS);
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);
  private assignedUsers: string[] = [];
  private subscriptions: Subscription[] = [];
  private boardID: string = "";

  constructor(private crudService: CrudService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public mainData: DialogData,
              private getBoardID: GetIdService,
  ) {
  }

  public ngOnInit(): void {
    let getTasks = this.crudService.handleData<TasksStore>(Collections.TASKS).pipe(
      tap((t) => {
        this.assignedUsers = [];
        t.filter((f) => f.boardID === this.boardID)
          .forEach((t) => this.assignedUsers.push(t.assignedUser))
      })
    )
    this.getBoardID.idValue$.pipe(
      tap((t) => {
        this.boardID = t;
      }),
      switchMap(() => getTasks)
    ).subscribe()
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
          this.user = value
        }
      )
    )
    this.myForm.addControl(BoardControl.users, new FormControl(this.mainData?.assignedUsers, Validators.required))
  }

  public isDisabled(userName: string | null | undefined): boolean {
    if (this.assignedUsers.includes(<string>userName)) {
      return true
    } else {
      return false
    }
  }

  public updateBoard(newBoard: Board, id: string): void {
    this.crudService.updateObject(Collections.BOARDS, id, newBoard).subscribe();
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newBoard: Board = {
        activeUsers: this.myForm?.controls[BoardControl.users].value,
      }
      this.updateBoard(newBoard, this.mainData?.boardID);
      this.myForm?.reset();
    } else {
      alert("Error")
    }
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.myForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardControl} from "../model/controls.enum";
import {Board, BoardStore, FireBaseUser, List, UserStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {GetIdService} from "../services/get-value/get-id.service";
import {delay, Observable, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-list-window',
  templateUrl: './board-window.component.html',
  styleUrls: ['./board-window.component.css']
})

export class BoardWindowComponent implements OnInit, OnDestroy {

  public myForm: FormGroup = new FormGroup({});
  public formControls: typeof BoardControl = BoardControl;
  public user: FireBaseUser | null = null;
  public boards$: Observable<BoardStore[]> = this.crudService.handleData(Collections.BOARDS);
  private completedBoards: BoardStore[] = [];
  private currentBoardID: string = "";
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private getIdService: GetIdService,
  ) {
  }

  public ngOnInit(): void {
    let filteredBoards = this.boards$.pipe(
      tap((value) => {
      this.completedBoards = value.filter((f) => f.name === "Completed" && f.activeUsers.includes(this.user?.uid!) && f.id === this.currentBoardID)
    }))
    this.getIdService.idValue$.pipe(
      tap((value) => {
        this.currentBoardID = value;
        console.log(this.currentBoardID)
      }),
      switchMap(() => filteredBoards)
    ).subscribe()
    this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      }
    )
    this.myForm.addControl(BoardControl.name, new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ])));
    this.myForm.addControl(BoardControl.users, new FormControl("", Validators.required))
  }

  public addBoard(newBoard: Board): void {
    this.crudService.createObject(Collections.BOARDS, newBoard).subscribe();
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newBoard: Board = {
        name: this.myForm?.controls[BoardControl.name].value,
        activeUsers: this.myForm?.controls[BoardControl.users].value,
      }
      this.addBoard(newBoard);
      // let defaultCompletedGroup: List;
      // if (this.completedBoards.length >= 1) {
      //   return
      // } else {
      //   this.getIdService.idValue$.pipe(
      //     delay(800),
      //     tap((value) => {
      //       defaultCompletedGroup = {
      //         name: "Completed",
      //         color: "#4caf50",
      //         tasksArray: [],
      //         activeUser: this.user?.uid,
      //         boardID: value,
      //       }
      //     }),
      //     switchMap(() => this.crudService.createObject(Collections.GROUP, defaultCompletedGroup))
      //   ).subscribe()
      // }
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
  }
}

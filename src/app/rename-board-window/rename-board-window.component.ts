import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardControl} from "../model/controls.enum";
import {Board, BoardStore, FireBaseUser, UserStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {Observable, Subscription} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

type DialogData = {
  boardID: string
}

@Component({
  selector: 'app-list-window',
  templateUrl: './rename-board-window.component.html',
  styleUrls: ['./rename-board-window.component.css']
})

export class RenameBoardWindowComponent implements OnInit, OnDestroy {

  public myForm: FormGroup = new FormGroup({});
  public formControls: typeof BoardControl = BoardControl;
  public user: FireBaseUser | null = null;
  public boards$: Observable<BoardStore[]> = this.crudService.handleData(Collections.BOARDS);
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);
  public currBoardName?: string = "";
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public mainData: DialogData,
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.crudService.handleData<BoardStore>(Collections.BOARDS).subscribe((s) => {
        let currentBoard = s.filter((f) => f.id === this.mainData?.boardID)
        this.currBoardName = currentBoard[0].name
      }),
      this.authService.user$.subscribe((value: firebase.User | null) => {
          this.user = value
        }
      )
    )
    this.myForm.addControl(BoardControl.name, new FormControl(this.currBoardName, Validators.compose([
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ])));
  }

  public editBoard(newBoard: Board): void {
    this.crudService.updateObject(Collections.BOARDS, this.mainData?.boardID, newBoard).subscribe();
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newBoard: Board = {
        name: this.myForm?.controls[BoardControl.name].value,
      }
      this.editBoard(newBoard);
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

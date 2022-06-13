import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardControl} from "../model/controls.enum";
import {Board, BoardStore, FireBaseUser, UserStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {GetIdService} from "../services/get-value/get-id.service";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

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

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private getIdService: GetIdService,
              @Inject(MAT_DIALOG_DATA) public mainData: DialogData,
  ) {
  }

  public ngOnInit(): void {
    console.log(this.mainData.assignedUsers)
    this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      }
    )
    this.myForm.addControl(BoardControl.users, new FormControl(this.mainData?.assignedUsers, Validators.required))
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
  }
}

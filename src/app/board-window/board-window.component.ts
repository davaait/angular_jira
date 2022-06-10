import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardControl} from "../model/controls.enum";
import {Board, BoardStore, FireBaseUser, UserStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {GetIdService} from "../services/get-value/get-id.service";
import {Observable} from "rxjs";

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
  private currentBoardID: string = "";
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);

  constructor(private crudService: CrudService,
              private authService: AuthService,
              private getIdService: GetIdService,
  ) {
  }

  public ngOnInit(): void {
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

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListControl} from "../model/controls.enum";
import {FireBaseUser, List, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GetIdService} from "../services/get-value/get-id.service";

type DialogData = {
  boardID: string
}

@Component({
  selector: 'app-list-window',
  templateUrl: './list-window.component.html',
  styleUrls: ['./list-window.component.css']
})

export class ListWindowComponent implements OnInit, OnDestroy {

  public myForm: FormGroup = new FormGroup({});
  public formControls: typeof ListControl = ListControl;
  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  private data: List[] = [];
  private handleTasks: TasksStore[] = [];
  private subscriptions: Subscription[] = [];
  private groupNameArray: string[] = [];
  public user: FireBaseUser | null = null;
  private urlID: string = "";

  constructor(private crudService: CrudService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public mainData: DialogData,
              private getIdService: GetIdService,
  ) { }

  public ngOnInit(): void {
    this.getIdService.idValue$.subscribe((value) => {
      this.urlID = value
    })
    this.subscriptions.push(
      this.crudService.handleData<List>(Collections.GROUP).subscribe((value: List[]) => {
        this.data = value;
        this.groupNameArray = [];
        this.data.forEach((g) => {
          this.groupNameArray.push(g.name)
        })
      }),
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
    this.myForm.addControl(ListControl.name, new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ])));
    this.myForm.addControl(ListControl.color, new FormControl("", Validators.required));
  }

  public addList(newList: List): void {
    if (this.groupNameArray.includes(this.myForm?.controls[ListControl.name].value) && this.urlID === this.mainData.boardID) {
      return
    } else {
      this.crudService.createObject(Collections.GROUP, newList).subscribe();
    }
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newList: List = {
        name: this.myForm?.controls[ListControl.name].value,
        color: this.myForm?.controls[ListControl.color].value.toString(),
        tasksArray: this.handleTasks,
        activeUser: this.user?.uid,
        boardID: this.mainData.boardID,
      }
      this.addList(newList);
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

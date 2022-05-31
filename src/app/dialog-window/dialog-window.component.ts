import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksControls} from "../model/controls.enum";
import {FireBaseUser, List, Task, TasksStore, UserStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {combineLatest, Observable, takeWhile} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

type DialogData = {
  boardID: string
}

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {

  public priorities: string[] = ['Low', 'Normal', 'High'];
  public imageLink: string | null = "";
  public progress: string | undefined = "";
  public myForm: FormGroup = new FormGroup({});
  public data: TasksStore[] = [];
  public groupData: List[] = [];
  public filteredGroups: List[] = [];
  public formControls: typeof TasksControls = TasksControls;
  public newDate: Date = new Date();
  public user: FireBaseUser | null = null;
  public users$: Observable<UserStore[]> = this.crudService.handleData(Collections.USERS);

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public mainData: DialogData,
              ) {
  }

  public onFileSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        combineLatest(this.uploadService.uploadFileAndGetMetadata('test', file))
          .pipe(
            takeWhile(([, link]) => {
              return !link;
            }, true),
          )
          .subscribe(([percent, link]) => {
            this.progress = percent;
            this.imageLink = link;
          });
      }
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
    this.crudService.getDate<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.groupData = value;
      this.filteredGroups = this.groupData.filter((g) => g.activeUser === this.user?.uid && g.boardID === this.mainData.boardID
      )
    })
    this.myForm.addControl(TasksControls.name, new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(3)])));
    this.myForm.addControl(TasksControls.priority, new FormControl("", Validators.required));
    this.myForm.addControl(TasksControls.dueDate, new FormControl("", Validators.required));
    this.myForm.addControl(TasksControls.group, new FormControl("", Validators.required));
    this.myForm.addControl(TasksControls.assignedUser, new FormControl("", Validators.required));
    this.myForm.addControl(TasksControls.description, new FormControl("", Validators.required));
  }

  public addTask(newTask: Task): void {
    this.crudService.createObject(Collections.TASKS, newTask).subscribe();
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newTask: Task = {
        name: this.myForm?.controls[TasksControls.name].value,
        priority: this.myForm?.controls[TasksControls.priority].value,
        dueDate: this.myForm?.controls[TasksControls.dueDate].value.toString(),
        group: this.myForm?.controls[TasksControls.group].value,
        description: this.myForm?.controls[TasksControls.description].value,
        dateOfCreation: new Date().toString(),
        updateDate: new Date().toString(),
        history: [this.user?.displayName + ' create task'],
        activeUser: this.user?.uid,
        assignedUser: this.myForm?.controls[TasksControls.assignedUser].value,
        boardID: this.mainData.boardID,
      }
      this.imageLink ? newTask.images = [this.imageLink] : '';
      this.addTask(newTask);
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
}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksControls} from "../model/controls.enum";
import {FireBaseUser, List, Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {Observable, Subscription} from "rxjs";
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import firebase from "firebase/compat";
import {AuthService} from "../services/auth/auth.service";
import {Routes} from "../routes";

export type DialogData = {
  currentTask: TasksStore,
}

@Component({
  selector: 'app-dialog-window',
  templateUrl: './edit-task-window.component.html',
  styleUrls: ['./edit-task-window.component.css']
})
export class EditTaskWindowComponent implements OnInit, OnDestroy {

  public priorities: string[] = ['Low', 'Normal', 'High'];
  public imageLink: string | null = "";
  public progress: string | undefined = "";
  public myForm: FormGroup = new FormGroup({});
  public tasksArray?: TasksStore[] = [];
  public groupData: List[] = [];
  public filteredGroup: List[] = [];
  public new: TasksStore[] = [];
  public formControls: typeof TasksControls = TasksControls;
  public user: FireBaseUser | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private location: Location,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private authService: AuthService,
  ) {
  }

  private task$: Observable<TasksStore[]> = this.crudService.getDate(Collections.TASKS);
  private group$: Observable<List[]> = this.crudService.getDate(Collections.GROUP);

  ngOnInit(): void {
    this.new = [];
    this.subscriptions.push(
      this.task$.subscribe((tasksValue) => {
        this.tasksArray = tasksValue as TasksStore[];
        this.new = this.tasksArray.filter((t) => t.id === this.data.currentTask.id)
      }),
      this.group$.subscribe((value: List[]) => {
        this.groupData = value;
        this.filteredGroup = this.groupData.filter((f) => f.activeUser === this.user?.uid)
      }),
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
    this.myForm.addControl(TasksControls.name, new FormControl(this.data?.currentTask.name, Validators.compose([Validators.required, Validators.maxLength(15)])));
    this.myForm.addControl(TasksControls.priority, new FormControl(this.data?.currentTask.priority, Validators.required));
    this.myForm.addControl(TasksControls.group, new FormControl(this.data?.currentTask.group, Validators.required));
    this.myForm.addControl(TasksControls.description, new FormControl(this.data?.currentTask.description, Validators.required));
  }

  goBack(): void {
    this.location.go(Routes.MAIN);
  }

  public updateTask(editedTask: Task, id: string | undefined): void {
    this.crudService.updateObject(Collections.TASKS, id, editedTask).subscribe()
  }

  public updateForm(id: string | undefined): void {
    let history: string[] = [];
    if (this.myForm.valid) {
      const currentTask: Task = {
        name: this.myForm?.controls[TasksControls.name].value,
        priority: this.myForm?.controls[TasksControls.priority].value,
        group: this.myForm?.controls[TasksControls.group].value,
        description: this.myForm?.controls[TasksControls.description].value,
        updateDate: new Date().toString()
      }

      if (this.new[0].name !== this.myForm?.controls[TasksControls.name].value) {
        history.push(this.user?.displayName + ' changed task name from ' + this.new[0].name + ' to ' + this.myForm?.controls[TasksControls.name].value)
      }

      if (this.new[0].priority !== this.myForm?.controls[TasksControls.priority].value) {
        history.push(this.user?.displayName + ' changed priority from ' + this.new[0].priority + ' to ' + this.myForm?.controls[TasksControls.priority].value)
      }

      if (this.new[0].group !== this.myForm?.controls[TasksControls.group].value) {
        history.push(this.user?.displayName + ' changed group from ' + this.new[0].group + ' to ' + this.myForm?.controls[TasksControls.group].value)
      }

      if (this.new[0].description !== this.myForm?.controls[TasksControls.description].value) {
        history.push(this.user?.displayName + ' changed description from ' + this.new[0].description + ' to ' + this.myForm?.controls[TasksControls.description].value)
      }

      if (this.new[0].history) {
        currentTask.history = [...history, ...this.new[0].history]
      } else {
        currentTask.history = [...history]
      }

      this.updateTask(currentTask, id);
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

  public ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksControls} from "../model/controls.enum";
import {List, Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {combineLatest, takeWhile} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Location} from "@angular/common";

export type DialogData = {
  currentTask: TasksStore,
}

@Component({
  selector: 'app-dialog-window',
  templateUrl: './edit-task-window.component.html',
  styleUrls: ['./edit-task-window.component.css']
})
export class EditTaskWindowComponent implements OnInit {

  public priorities: string[] = ['Low', 'Normal', 'High'];
  public imageLink: string | null = "";
  public progress: string | undefined = "";
  public myForm: FormGroup = new FormGroup({});
  public groupData: List[] = [];
  public formControls: typeof TasksControls = TasksControls;

  constructor(private crudService: CrudService, private location: Location, private uploadService: UploadService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.crudService.getDate<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.groupData = value;
    })
    this.myForm.addControl(TasksControls.name, new FormControl(this.data?.currentTask?.name, Validators.compose([Validators.required, Validators.maxLength(15)])));
    this.myForm.addControl(TasksControls.priority, new FormControl(this.data?.currentTask?.priority, Validators.required));
    this.myForm.addControl(TasksControls.group, new FormControl(this.data?.currentTask?.group, Validators.required));
    this.myForm.addControl(TasksControls.description, new FormControl(this.data?.currentTask?.description, Validators.required));
  }

  public updatedTask(newTask: Task, id: string | undefined): void {
    this.crudService.updateObject(Collections.TASKS, id,newTask).subscribe();
  }

  public updateTask(id: string | undefined): void {
    if (this.myForm.valid) {
      const newTask: Task = {
        name: this.myForm?.controls[TasksControls.name].value,
        priority: this.myForm?.controls[TasksControls.priority].value,
        group: this.myForm?.controls[TasksControls.group].value,
        description: this.myForm?.controls[TasksControls.description].value,
        pictureUrl: this.imageLink,
      }
      this.updatedTask(newTask, id);
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

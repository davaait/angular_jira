import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksControls} from "../model/controls.enum";
import {List, Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {combineLatest, takeWhile} from "rxjs";

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
  public formControls: typeof TasksControls = TasksControls;

  constructor(private crudService: CrudService, private uploadService: UploadService) {
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
    this.crudService.getDate<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.groupData = value;
    })
    this.myForm.addControl(TasksControls.name, new FormControl("", Validators.compose([Validators.required, Validators.maxLength(15)])));
    this.myForm.addControl(TasksControls.priority, new FormControl("", Validators.required));
    this.myForm.addControl(TasksControls.dueDate, new FormControl("", Validators.required));
    this.myForm.addControl(TasksControls.group, new FormControl("", Validators.required));
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
        pictureUrl: this.imageLink,
        description: this.myForm?.controls[TasksControls.description].value,
      }
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

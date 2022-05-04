import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksControls} from "../model/controls.enum";
import {Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {combineLatest, takeWhile} from "rxjs";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {
  public priorities: string[] = ['Low', 'Normal', 'High'];
  public groups: string[] = ['Pending', 'Completed', 'Inprogress', 'Review'];

  public imageLink: string | null = "";

  public progress: string | undefined = "";

  private datePickerValue: Date | undefined;

  public myForm: FormGroup = new FormGroup({});

  public data: TasksStore[] = [];

  public selectedOption: string = "";

  public formControls: typeof TasksControls = TasksControls;

  constructor(private crudService: CrudService, private uploadService: UploadService, public fb: FormBuilder) {
  }

  public selectChangeHandler(): void {
    console.log("select value equal to ", this.selectedOption)
  }

  public onDateChange(event: Date): void {
    this.datePickerValue = event
    console.log('Value from date picker is ', this.datePickerValue)
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

  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  private reactiveForm() {
    this.myForm = this.fb.group({
      dob: ['']
    })
  }

  /* Convert date object to string */
  date(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  ngOnInit(): void {
    this.reactiveForm()
    this.crudService.getDate<TasksStore>(Collections.TASKS).subscribe((value: TasksStore[]) => {
      this.data = value;
    })
    this.myForm.addControl(TasksControls.name, new FormControl("", Validators.compose([Validators.required, Validators.maxLength(15)])));
    // this.myForm.addControl(TasksControls.priority, new FormControl("", Validators.required));
    // this.myForm.addControl(TasksControls.dueDate, new FormControl("", Validators.required));
    // this.myForm.addControl(TasksControls.group, new FormControl("", Validators.required));
  }

  public addTask(newTask: Task): void {
    this.crudService.createObject(Collections.TASKS, newTask).subscribe((value) => console.log(value));
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newTask: Task = {
        name: this.myForm?.controls[TasksControls.name].value,
        priority: this.myForm?.controls[TasksControls.priority].value,
        dueDate: this.myForm?.controls[TasksControls.dueDate].value,
        group: this.myForm?.controls[TasksControls.group].value,
      }
      this.addTask(newTask);
      this.myForm?.reset();
    } else {
      alert("Error")
    }
  }

  public update(id: string): void {
    const task: Task = {
      name: 'react/redux',
      priority: 'normal',
      dueDate: '09-05-2022',
      group: 'completed'
    }
    this.crudService.updateObject(Collections.TASKS, id, task).subscribe();
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<Task>(Collections.TASKS, id).subscribe(((task: Task | undefined) => {
          if (task) {
            const tasksStore: any = {...task, id};
            this.update(tasksStore);

            this.myForm.controls[this.formControls.name].setValue(task.name);
            this.myForm.controls[this.formControls.priority].setValue(task.priority);
            this.myForm.controls[this.formControls.dueDate].setValue(task.dueDate);
            this.myForm.controls[this.formControls.group].setValue(task.group);
          }
        }
      )
    );
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

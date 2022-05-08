import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListControl, TasksControls} from "../model/controls.enum";
import {List, Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {combineLatest, takeWhile} from "rxjs";

@Component({
  selector: 'app-list-window',
  templateUrl: './list-window.component.html',
  styleUrls: ['./list-window.component.css']
})

export class ListWindowComponent implements OnInit {
  public priorities: string[] = ['Low', 'Normal', 'High'];
  public groups: string[] = ['Pending', 'Completed', 'Inprogress', 'Review'];

  public imageLink: string | null = "";

  public progress: string | undefined = "";

  public myForm: FormGroup = new FormGroup({});

  public data: TasksStore[] = [];

  public formControls: typeof ListControl = ListControl;

  constructor(private crudService: CrudService, private uploadService: UploadService) {
  }



  ngOnInit(): void {
    this.crudService.getDate<TasksStore>(Collections.TASKS).subscribe((value: TasksStore[]) => {
      this.data = value;
    })
    this.myForm.valueChanges.subscribe(value => console.log(value));
    this.myForm.addControl(ListControl.name, new FormControl("", Validators.compose([Validators.required, Validators.maxLength(15)])));
  }

  public addList(newTask: Task): void {
    this.crudService.createObject(Collections.TASKS, newTask).subscribe((value) => console.log(value));
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newTask: Task = {
        name: this.myForm?.controls[TasksControls.name].value,
        priority: this.myForm?.controls[TasksControls.priority].value,
        dueDate: this.myForm?.controls[TasksControls.dueDate].value.toString(),
        group: this.myForm?.controls[TasksControls.group].value,
        pictureUrl: this.imageLink
      }
      this.addTask(newTask);
      this.myForm?.reset();
    } else {
      alert("Error")
    }
  }

  public update(id: string): void {
    const list: List = {
      name: 'Veterinary Clinic',
      color: '#ff006a'
    }
    this.crudService.updateObject(Collections.GROUP, id, list).subscribe();
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<Task>(Collections.GROUP, id).subscribe(((list: Task | undefined) => {
          if (list) {
            const listStore: any = {...list, id};
            this.update(listStore);
            this.myForm.controls[this.formControls.name].setValue(list.name);
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

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserControls} from "../model/controls.enum";
import {Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {DocumentReference} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});

  public data: TasksStore[] = [];

  public formControls: typeof UserControls = UserControls;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe(value => console.log(value));
    this.myForm.addControl(UserControls.name, new FormControl("", Validators.required));
    this.myForm.addControl(UserControls.surname, new FormControl("Test", Validators.required));
    this.myForm.addControl(UserControls.email, new FormControl("", Validators.compose([Validators.required, Validators.email])));
  }

  public addTask(newTask:string): any {
    const task: Task = {
      taskName: 'MILK',
      taskGroup: 'Pending'
    }
    this.crudService.createObject(Collections.TASKS, newTask).subscribe((value: any) => console.log(value));
  }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newTask: any = {
        name: this.myForm?.controls[UserControls.name].value,
        surname: this.myForm?.controls[UserControls.surname].value,
        email: this.myForm?.controls[UserControls.email].value
      }
      this.addTask(newTask);
      this.myForm?.reset();
    } else {
      alert("Error")
    }
  }

  public update(id: string): void {
    const task: Task = {
      taskName: 'BREAD',
      taskGroup: 'Completed'
    }
    this.crudService.updateObject(Collections.TASKS, id, task).subscribe();
  }

  public getInfo(id: string): void {
    this.crudService.getUserDoc<Task>(Collections.TASKS, id).subscribe(((user: Task | undefined) => {
          if (user) {
            const tasksStore: TasksStore = {...user, id};
            this.update(tasksStore);

            this.myForm.controls[this.formControls.name].setValue(user.name);
            this.myForm.controls[this.formControls.surname].setValue(user.surname);
            this.myForm.controls[this.formControls.email].setValue(user.email);
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

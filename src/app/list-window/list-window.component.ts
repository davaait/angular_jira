import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListControl} from "../model/controls.enum";
import {List, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-list-window',
  templateUrl: './list-window.component.html',
  styleUrls: ['./list-window.component.css']
})

export class ListWindowComponent implements OnInit {

  private data: List[] = [];
  private handleTasks: TasksStore[] = [];
  public myForm: FormGroup = new FormGroup({});
  public formControls: typeof ListControl = ListControl;
  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);
  private groupNameArray: string[] = ['backend', 'whatever'];

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.crudService.handleData<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.data = value;
      // this.groupNameArray = [];
      // this.data.forEach((g) => {
      //   this.groupNameArray.push(g.name)
      // })
      // console.log(this.groupNameArray)
    })
    this.myForm.valueChanges.subscribe();
    this.myForm.addControl(ListControl.name, new FormControl("", Validators.compose([
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5),
      // this.checkGroupName
    ])));
    this.myForm.addControl(ListControl.color, new FormControl("", Validators.required));
  }

  public addList(newList: List): void {
    this.crudService.createObject(Collections.GROUP, newList).subscribe((value) => console.log(value));
  }

  // private checkGroupName(control: AbstractControl): {[key: string]: any} | null  {
  //   let name = control.value;
  //   if (this.groupNameArray.includes(name)) {
  //     return { 'groupNumberInvalid': true };
  //   }
  //   return null;
  // }

  public submitForm(): void {
    if (this.myForm.valid) {
      const newList: List = {
        name: this.myForm?.controls[ListControl.name].value,
        color: this.myForm?.controls[ListControl.color].value.toString(),
        tasksArray: this.handleTasks,
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
}

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
  public myForm: FormGroup = new FormGroup({});

  private data: List[] = [];
  public groupsData?: List[] | undefined;
  public tasks: Observable<TasksStore[]> = this.crudService.handleData<TasksStore>(Collections.TASKS);

  private handleTasks: TasksStore[] = [];

  public formControls: typeof ListControl = ListControl;

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.crudService.handleData<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.data = value;
    })
    this.myForm.valueChanges.subscribe();
    this.myForm.addControl(ListControl.name, new FormControl("", Validators.compose([Validators.required, Validators.maxLength(15)])));
    this.myForm.addControl(ListControl.color, new FormControl("", Validators.required));
  }

  public addList(newList: List): void {
    this.crudService.createObject(Collections.GROUP, newList).subscribe((value) => console.log(value));
  }

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

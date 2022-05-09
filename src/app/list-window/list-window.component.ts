import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListControl} from "../model/controls.enum";
import {List} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";

@Component({
  selector: 'app-list-window',
  templateUrl: './list-window.component.html',
  styleUrls: ['./list-window.component.css']
})

export class ListWindowComponent implements OnInit {

  // public colorCtr: FormControl = new FormControl(null);

  public myForm: FormGroup = new FormGroup({});

  public data: List[] = [];

  public formControls: typeof ListControl = ListControl;

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.crudService.getDate<List>(Collections.GROUP).subscribe((value: List[]) => {
      this.data = value;
    })
    this.myForm.valueChanges.subscribe(value => console.log(value));
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
        tasksArray: []
      }
      this.addList(newList);
      this.myForm?.reset();
    } else {
      alert("Error")
    }
  }

  // public update(id: string): void {
  //   const list: List = {
  //     name: 'Veterinary Clinic',
  //     color: '#ff006a'
  //   }
  //   this.crudService.updateObject(Collections.GROUP, id, list).subscribe();
  // }

  // public getInfo(id: string): void {
  //   this.crudService.getUserDoc<List>(Collections.GROUP, id).subscribe(((list: List | undefined) => {
  //         if (list) {
  //           const listStore: any = {...list, id};
  //           this.update(listStore);
  //           this.myForm.controls[this.formControls.name].setValue(list.name);
  //           this.myForm.controls[this.formControls.color].setValue(list.color);
  //         }
  //       }
  //     )
  //   );
  // }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.myForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }
}

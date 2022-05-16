import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListControl, TasksControls} from "../model/controls.enum";
import {List, Task, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {CrudService} from "../services/crud/crud.service";
import {UploadService} from "../services/upload/upload.service";
import {combineLatest, Observable, takeWhile} from "rxjs";
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Color} from "@angular-material-components/color-picker";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './edit-list-window.component.html',
  styleUrls: ['./edit-list-window.component.css']
})
export class EditListWindowComponent implements OnInit {

  public myForm: FormGroup = new FormGroup({});
  public groupData: List[] = [];
  public formControls: typeof ListControl = ListControl;

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private location: Location,
              @Inject(MAT_DIALOG_DATA) public data: List) {}

  private group$: Observable<List[]> = this.crudService.getDate(Collections.GROUP);

  ngOnInit(): void {
    this.group$.subscribe((value: List[]) => {
      this.groupData = value;
      this.groupData = this.groupData.filter((f) => f.id === this.data.id)
    })
    console.log(this.groupData)
    this.myForm.addControl(ListControl.name, new FormControl(this.data?.name, Validators.compose([Validators.required, Validators.maxLength(15)])));
    this.myForm.addControl(ListControl.color, new FormControl(this.data?.color, Validators.required));
  }

  goBack(): void {
    this.location.back();
  }

  public updateList(editedList: List, id: string | undefined): void {
    this.crudService.updateObject(Collections.GROUP, id, editedList).subscribe()
  }

  public updateForm(id: string | undefined): void {
    if (this.myForm.valid) {
      const currentList: List = {
        name: this.myForm?.controls[ListControl.name].value,
        color: this.myForm?.controls[ListControl.color].value,
      }
      this.updateList(currentList, id);
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

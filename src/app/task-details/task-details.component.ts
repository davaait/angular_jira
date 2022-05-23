import {Component, Inject, OnInit} from '@angular/core';
import {UploadService} from "../services/upload/upload.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CrudService} from "../services/crud/crud.service";
import {TasksStore} from "../services/types";

type DialogData = {
  item: TasksStore
}

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  constructor(private crudService: CrudService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private uploadService: UploadService,
              ) { }

  public ngOnInit(): void {

  }

}

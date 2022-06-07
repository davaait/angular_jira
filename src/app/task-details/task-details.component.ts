import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {UploadService} from "../services/upload/upload.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CrudService} from "../services/crud/crud.service";
import {FireBaseUser, List, TasksStore, User} from "../services/types";
import {combineLatest, Subscription, takeWhile} from "rxjs";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {Collections} from "../services/crud/collections";
import {EditTaskWindowComponent} from "../edit-task-window/edit-task-window.component";

type DialogData = {
  item: TasksStore
}

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  public user: FireBaseUser = null;
  public createDate: string | undefined;
  public updateDate: string | undefined;
  public imageLink: string | null = '';
  public progress: string | undefined = '';
  public imagesArr: string[] = [];
  public new: any = [];
  public history: string[] = [];
  private subscriptions: Subscription[] = [];
  public assignedPerson: string | undefined
  public savedUsers?: User[];
  public pictureUrl?: string | undefined | null
  public personName?: string | undefined | null
  public currentGroupName: List[] = [];

  constructor(private crudService: CrudService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private uploadService: UploadService,
              public authService: AuthService,
              public dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      }),
      this.crudService.handleData<TasksStore>(Collections.TASKS).subscribe((value) => {
        this.new = value.filter((f) => f.id === this.data?.item?.id)
        this.imagesArr = this.new[0].images
        this.updateDate = this.data?.item?.updateDate ? this.new[0].updateDate : "no update date"
        this.history = this.new[0].history
        this.assignedPerson = this.new[0].assignedUser
      }),
      this.crudService.handleData<List>(Collections.GROUP).subscribe((v) => {
        this.currentGroupName = v.filter((f) => f.id === this.data?.item?.group)
      })
    )
    this.createDate = this.data?.item?.dateOfCreation ? this.data?.item?.dateOfCreation : "no date of creation"
    this.crudService.handleData<User>(Collections.USERS).subscribe((user) => {
      this.savedUsers = user.filter((f) => f.name === this.assignedPerson)
      this.pictureUrl = this.savedUsers[0].avatarUrl
      this.personName = this.savedUsers[0].name
    })
  }

  public editWindow(t: TasksStore | undefined): void {
    this.dialog.open(EditTaskWindowComponent, {data: {currentTask: t}});
  }

  public onFileSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        combineLatest(this.uploadService.uploadFileAndGetMetadata('images', file))
          .pipe(
            takeWhile(([, link]) => {
              return !link;
            }, true),
          )
          .subscribe(([percent, link]) => {
            this.progress = percent;
            this.imageLink = link;
            if (this.imageLink) {
              let newImage = {};
              if (this.data.item.images) {
                newImage = {
                  images: [...this.data.item.images, this.imageLink],
                  updateDate: new Date().toString(),
                  history: this.data.item.history?.concat(this.user?.displayName + ' uploaded new file')
                }
              } else {
                newImage = {
                  images: [this.imageLink]
                }
              }
              this.progress = '';
              this.imageLink = '';
              this.crudService.updateObject(Collections.TASKS, this.data.item.id, newImage)
            }
          });
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}

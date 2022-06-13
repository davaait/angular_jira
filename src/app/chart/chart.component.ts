import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartData} from 'chart.js';
import {CrudService} from "../services/crud/crud.service";
import {Observable, Subscription, tap} from "rxjs";
import {FireBaseUser, List, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {

  constructor(private crudService: CrudService,
              private authService: AuthService,
  ) {
  }

  public doughnutChartLabels: string[] = [];
  public user: FireBaseUser = null;
  public groupsData?: List[] | undefined;
  public filteredGroup?: List[];
  public doughnutChartType: any = 'doughnut';
  private subscriptions: Subscription[] = [];
  private tasks$: Observable<TasksStore[]> = this.crudService.handleData(Collections.TASKS);
  public chartData: number[] = [];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {data: []},
    ]
  };

  public ngOnInit() {
    const updateTask: Observable<TasksStore[]> = this.tasks$.pipe(
      tap((task) => {
        const tasks: TasksStore[] = task;
        this.filteredGroup?.forEach((group: List) => {
            group.tasksArray = tasks.filter((filteredTask: TasksStore) =>
              filteredTask.group === group.id
              && filteredTask.activeUser === this.user?.uid
            )
            if (group.activeUser === this.user?.uid) {
              this.doughnutChartLabels.push(group.name)
              this.chartData.push(group.tasksArray.length)
              this.doughnutChartData = {
                labels: this.doughnutChartLabels,
                datasets: [
                  {data: this.chartData}
                ]
              }
            }
          }
        )
      })
    );
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      }),
      this.crudService.handleData<List>(Collections.GROUP).pipe(
        tap(value => {
          this.groupsData = value
          this.filteredGroup = this.groupsData.filter((g) => g.activeUser === this.user?.uid)
        }),
        switchMap(() => updateTask)
      ).subscribe()
    )
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}

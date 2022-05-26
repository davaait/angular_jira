import {Component, OnInit} from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import {CrudService} from "../services/crud/crud.service";
import {Observable} from "rxjs";
import {FireBaseUser, TasksStore} from "../services/types";
import {Collections} from "../services/crud/collections";
import {AuthService} from "../services/auth/auth.service";
import firebase from "firebase/compat";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ]
})
export class ChartComponent implements OnInit {
  // Doughnut
  // public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];

  constructor(private crudService: CrudService,
              private authService: AuthService,
              ) {
  }
  public doughnutChartLabels: string[] = [];
  private tasks$: Observable<TasksStore[]> = this.crudService.handleData(Collections.TASKS);
  private groups$: Observable<TasksStore[]> = this.crudService.handleData(Collections.GROUP);
  public user: FireBaseUser = null;

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 150, 120 ] },
    ]
  };

  public doughnutChartType: any = 'doughnut';

  public ngOnInit() {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
    this.groups$.subscribe((g) => {
      const arrGr = g.filter((f) => f.activeUser === this.user?.uid)
      console.log(arrGr)
    })
    this.tasks$.subscribe((t) => {
      const arr = t.filter((t) => t.activeUser === this.user?.uid)
      arr.forEach((f) => this.doughnutChartLabels.push(f.group))
      console.log(this.doughnutChartLabels)
      }
    )
  }
}

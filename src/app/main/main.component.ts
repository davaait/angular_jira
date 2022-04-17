import { Component, OnInit } from '@angular/core';
import {itemsArrayType} from "../app.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Data arrays
  public pendingTodos: string[] = ['react/redux', 'JS', 'HTML/CSS']

  public completedTodos: string[] = ['.NET', 'Python']

  public inProgressTodos: string[] = ['Java']

  public reviewTodos: string[] = ['Kotlin', 'ReactNative', 'ObjectiveC', 'NodeJS', 'C++']

  public itemsArray: Array<itemsArrayType> = [
    {itemName: 'Pending', color: '#ef5350', array: this.pendingTodos},
    {itemName: 'Completed', color: '#42a5f5', array: this.completedTodos},
    {itemName: 'Inprogress', color: '#4caf50', array: this.inProgressTodos},
    {itemName: 'Review', color: '#ff9b44', array: this.reviewTodos},
  ]

}

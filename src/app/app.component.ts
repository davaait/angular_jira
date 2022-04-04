import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

export type UsersType = {
  name: string,
  surname: string
}
export type PendingTodosType = string[]
export type CompletedTodosType = string[]
export type InProgressTodosType = string[]
export type ReviewTodosType = string[]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my_project';

  public user: UsersType = {
    name: 'David',
    surname: 'Ait'
  }

  // Data arrays
  public itemsArray = [
    {itemName: 'Pending', color: '#ef5350'},
    {itemName: 'Completed', color: '#42a5f5'},
    {itemName: 'Inprogress', color: '#4caf50'},
    {itemName: 'Review', color: '#ff9b44'},
  ]

  public pendingTodos: PendingTodosType = ['react/redux', 'JS', 'HTML/CSS']

  public completedTodos: CompletedTodosType = ['.NET', 'Python']

  public inProgressTodos: InProgressTodosType = ['Java']

  public reviewTodos: ReviewTodosType = ['Kotlin', 'ReactNative', 'ObjectiveC', 'NodeJS', 'C++']

  // DragNDrop function
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

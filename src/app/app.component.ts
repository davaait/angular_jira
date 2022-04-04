import { Component } from '@angular/core';
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
  pendingTodos: PendingTodosType = ['react/redux', 'JS', 'HTML/CSS']

  completedTodos: CompletedTodosType = ['.NET', 'Python']

  inProgressTodos: InProgressTodosType = ['Java']

  reviewTodos: ReviewTodosType = ['Kotlin', 'ReactNative', 'ObjectiveC', 'NodeJS', 'C++']

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

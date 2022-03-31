import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my_project';

  public user = {
    name: 'David',
    surname: 'Ait'
  }

  // Data arrays
  pendingTodos = ['react/redux', 'JS', 'HTML/CSS']

  completedTodos = ['.NET', 'Python']

  inProgressTodos = ['Java']

  reviewTodos = ['Kotlin', 'ReactNative', 'ObjectiveC', 'NodeJS', 'C++']

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

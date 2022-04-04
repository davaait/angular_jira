import {Component} from '@angular/core';

export type UsersType = {
  name: string,
  surname: string
}

export type itemsArrayType = {
  itemName: string,
  color: string,
  array: string[]
}

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

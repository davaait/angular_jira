import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {AuthService} from "./services/auth/auth.service";
import {FormControl} from "@angular/forms";

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
export class AppComponent implements OnInit {

  public title: string = 'my_project';

  public mode = new FormControl('over');
  public shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  public user: firebase.User | null = null;

  constructor(public authService: AuthService) {
  }

  public ngOnInit() {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
  }

  public login(): void {
    this.authService.googleSignIn().subscribe()
  }

  public signOut(): void {
    // this.authService.signOut().subscribe(() => this.router.navigate(["/"]))
    this.authService.signOut().subscribe()
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

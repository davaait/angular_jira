import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FireBaseUser} from "./services/types";

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

  public user: FireBaseUser = null;

  constructor(public authService: AuthService,
              public router: Router) {
  }

  public ngOnInit() {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value

    })
  }

  public login(): void {
    this.authService.googleSignIn().subscribe()
  }

  public signOut(): void {
    // this.authService.signOut().subscribe(() => this.router.navigate(["/"]))
    this.authService.signOut().subscribe()
  }
}

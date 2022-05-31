import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {BoardStore, FireBaseUser} from "../services/types";
import firebase from "firebase/compat";
import {Subscription} from "rxjs";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {Routes} from "../routes";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public user: FireBaseUser = null;
  private subscriptions: Subscription[] = [];

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  public defaultBoardID?: string;

  constructor(private authService: AuthService,
              public router: Router,
              private crudService: CrudService,
              ) {
  }

  public login(): void {
    this.authService.googleSignIn().pipe(
      switchMap(() => this.authService.user$)
    )
      .subscribe(() => this.router.navigate([Routes.BOARD, this.defaultBoardID]))
  }

  public ngOnInit(): void {
    this.crudService.handleData<BoardStore>(Collections.BOARDS).subscribe((s) => {
      this.defaultBoardID = s[0].id
      console.log(this.defaultBoardID)
    })
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => {
        this.user = value
      })
    )
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}

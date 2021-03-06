import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {FireBaseUser} from "../services/types";
import firebase from "firebase/compat";
import {Subscription} from "rxjs";
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

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService,
              public router: Router,
  ) {
  }

  public login(): void {
    this.authService.googleSignIn().pipe(
      switchMap(() => this.authService.user$)
    )
      .subscribe(() => this.router.navigate([Routes.WELCOME]))
  }

  public ngOnInit(): void {
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

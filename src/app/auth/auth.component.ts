import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {FireBaseUser} from "../services/types";
import firebase from "firebase/compat";

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
export class AuthComponent implements OnInit {

  public user: FireBaseUser = null;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService,
              public router: Router) {
  }

  public login(): void {
    // this.authService.googleSignIn().subscribe(() => this.router.navigate(["/main"]))
    this.authService.googleSignIn().pipe(
      switchMap(() => this.authService.user$)
    )
      .subscribe(() => this.router.navigate(["/main"]))
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((value: firebase.User | null) => {
      this.user = value
    })
  }

}

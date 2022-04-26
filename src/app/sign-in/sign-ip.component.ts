import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Routes} from "../routes";
import {switchMap} from "rxjs/operators";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-ip.component.html',
  styleUrls: ['./sign-ip.component.css']
})
export class SignIpComponent implements OnInit {

  public routes: typeof Routes = Routes;

  constructor(
    private authService: AuthService,
    public router: Router) { }

  public toSignUp(): void {
    this.authService.googleSignIn().
    pipe(
      switchMap(() => this.authService.user$)
    )
      .subscribe(() => this.router.navigate(["/main"]))
  }

  ngOnInit(): void {
  }

}

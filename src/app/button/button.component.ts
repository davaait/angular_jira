import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() iconName?: string;
  @Input() buttonText?: string;
  @Input() stroked?: boolean;
  @Input() expand?: boolean;
  @Input() strokedColor?: boolean;
  @Input() btnTheme?: string;
  @Input() menuAccBtn?: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
  }

  public logout(): void {
    this.authService.signOut()
      .pipe(
        switchMap(() => this.authService.user$)
      )
      .subscribe(() => this.router.navigate(["login"]))
  }

  ngOnInit(): void {
  }

}

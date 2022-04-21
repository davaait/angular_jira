import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

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

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  public signOut(): void {
    // this.authService.signOut().subscribe(() => this.router.navigate(["/"]))
    this.authService.signOut()
      .pipe(
        switchMap(() => this.authService.user$)
      )
      .subscribe(() => this.router.navigate(["/"]))
  }

  ngOnInit(): void {
  }

}

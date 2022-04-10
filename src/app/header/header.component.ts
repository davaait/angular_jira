import {Component, Input, OnInit} from '@angular/core';
import {UsersType} from "../app.component";

export type IconsNameType = {
  menu: string,
  settings: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public iconsName: IconsNameType = {
    menu: 'menu',
    settings: 'settings'
  }

  @Input() user?: UsersType;

  constructor() {
  }

  ngOnInit(): void {
  }

}

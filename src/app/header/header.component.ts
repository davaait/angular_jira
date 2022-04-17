import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";

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

  @Input() user?: firebase.User | null;
  @Input() fn?: () => void;

  constructor() {
  }

  ngOnInit(): void {
  }

}

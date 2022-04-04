import {Component, OnInit} from '@angular/core';

type IconsNameType = {
  add: string,
  add_circle_outline: string
}

type ButtonTextType = {
  create: string,
  addTask: string
}

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  public iconsName: IconsNameType = {
    add: 'add',
    add_circle_outline: 'add_circle_outline'
  }

  public buttonText: ButtonTextType = {
    create: 'Create List',
    addTask: 'Add New Task'
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}

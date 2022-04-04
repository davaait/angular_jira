import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() iconName?: string;
  @Input() buttonText?: string;
  @Input() stroked?: boolean;
  @Input() strokedColor?: boolean;
  @Input() color?: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}

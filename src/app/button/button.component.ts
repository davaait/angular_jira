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
  @Input() expand?: boolean;
  @Input() strokedColor?: boolean;
  @Input() btnTheme?: string;
  @Input() menuAccBtn?: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}

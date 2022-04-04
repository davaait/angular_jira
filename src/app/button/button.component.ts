import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() iconName?: string;
  @Input() buttonText?: string;
  @Input() matValue?: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}

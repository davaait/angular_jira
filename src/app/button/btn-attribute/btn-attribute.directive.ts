import {Directive} from '@angular/core';

@Directive({
  selector: '[appBtnAttribute]'
})
export class BtnAttributeDirective {

  constructor() { }

  setType(value: string) {
    console.log(value)
  }

}

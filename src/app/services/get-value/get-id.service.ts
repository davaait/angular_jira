import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  public idValue$ = new Subject<string>();

  public changeIdValue(valueID: string) {
    this.idValue$.next(valueID);
  }

  constructor() { }
}

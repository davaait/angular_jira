import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  public idValue$ = new ReplaySubject<string>();

  public changeIdValue(valueID: string) {
    this.idValue$.next(valueID);
  }

  constructor() {
  }
}

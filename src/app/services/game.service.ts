import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  textSubject = new Subject<[string, string]>();
  constructor() { }
}

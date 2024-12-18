import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {AnimationEvent} from "../enums/AnimationEvent";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  textSubject = new Subject<[string, string]>();
  eventsSubject: Subject<AnimationEvent> = new Subject();

  constructor() { }
}

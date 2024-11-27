import {Component, EventEmitter} from '@angular/core';
import {TextFieldComponent} from "../../components/text-field/text-field.component";
import {PointsCounterComponent} from "../../components/points-counter/points-counter.component";
import {AnimationEvent} from "../../enums/AnimationEvent";
import {AnimateDirective, AnimationConfig} from "../../animate.directive";
import {Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-game-page',
  imports: [
    TextFieldComponent,
    PointsCounterComponent,
    AnimateDirective
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {

  subject: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  config:AnimationConfig = {
    path: 'assets/animations/animation.json',
    animationEvents: this.subject,
    animationAmount: 10,
    animationDelay: 100,
    cssProperty: 'padding-left',
    moveMax: 1000
  }

  left() {
    this.subject.next(AnimationEvent.BACKWARD);
  }

  right() {
    this.subject.next(AnimationEvent.FORWARD);
  }
}

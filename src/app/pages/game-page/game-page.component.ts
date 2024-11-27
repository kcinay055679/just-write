import {Component, EventEmitter} from '@angular/core';
import {TextFieldComponent} from "../../components/text-field/text-field.component";
import {PointsCounterComponent} from "../../components/points-counter/points-counter.component";
import {AnimationEvent} from "../../enums/AnimationEvent";
import {AnimationConfig} from "../../animate.directive";

@Component({
  selector: 'app-game-page',
  imports: [
    TextFieldComponent,
    PointsCounterComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent {

  eventEmitter: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();

  config:AnimationConfig = {
    path: 'assets/animations/animation.json',
    events: this.eventEmitter
  }
}

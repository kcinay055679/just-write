import { Component } from '@angular/core';
import {TextFieldComponent} from "../../components/text-field/text-field.component";
import {PointsCounterComponent} from "../../components/points-counter/points-counter.component";

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

}

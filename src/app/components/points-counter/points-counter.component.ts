import {Component, Input} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {PointsHandler} from "../../points-handler";

export interface ProgressBarConfig {
  pointsHandler: PointsHandler;
  fillColor: string;
}

@Component({
  selector: 'app-points-counter',
    imports: [
        MatProgressBar
    ],
  templateUrl: './points-counter.component.html',
  styleUrl: './points-counter.component.scss'
})
export class PointsCounterComponent{
  @Input()
  progressBarConfig!: ProgressBarConfig;
}

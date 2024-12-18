import {Component, Input} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {Subject} from "rxjs";

export interface ProgressBarConfig {
  initialValue: number;
  min: number;
  max: number;
  fillColor: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-points-counter',
    imports: [
        MatProgressBar
    ],
  templateUrl: './points-counter.component.html',
  styleUrl: './points-counter.component.scss'
})
export class PointsCounterComponent {
  @Input()
  updateProgress: Subject<number> = new Subject();

  @Input()
  progressBarConfig!: ProgressBarConfig;

  currentProgress: number = 0;

  constructor() {
    this.updateProgress.subscribe((v) => {
      this.currentProgress += v;
    });
  }
}

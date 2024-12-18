import {AfterContentInit, Component, Input} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {Subject} from "rxjs";

export interface ProgressBarConfig {
  initialValue: number;
  min: number;
  max: number;
  fillColor: string;
  updateSubject: Subject<number>;
}

@Component({
  selector: 'app-points-counter',
    imports: [
        MatProgressBar
    ],
  templateUrl: './points-counter.component.html',
  styleUrl: './points-counter.component.scss'
})
export class PointsCounterComponent implements AfterContentInit{
  @Input()
  progressBarConfig!: ProgressBarConfig;

  currentProgress: number = 0;

  ngAfterContentInit() {
    this.progressBarConfig.updateSubject.subscribe((v) => {
      this.currentProgress += v;
    });
  }
}

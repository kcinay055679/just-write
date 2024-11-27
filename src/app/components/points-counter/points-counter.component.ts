import { Component } from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-points-counter',
    imports: [
        MatProgressBar
    ],
  templateUrl: './points-counter.component.html',
  styleUrl: './points-counter.component.scss'
})
export class PointsCounterComponent {

}

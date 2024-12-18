import {AfterContentInit, Component, Input} from '@angular/core';
import {AnimateDirective, AnimationConfig} from "../animate.directive";
import {Subject} from "rxjs";
import {AnimationEvent} from "../enums/AnimationEvent";

@Component({
  selector: 'app-entity-management',
  imports: [
    AnimateDirective
  ],
  templateUrl: './entity-management.component.html',
  styleUrl: './entity-management.component.scss'
})
export class EntityManagementComponent implements AfterContentInit {
  @Input()
  updateAnimation: Subject<AnimationEvent> = new Subject();

  config: AnimationConfig = {
    path: 'assets/animations/animation.json',
    animationEvents: this.updateAnimation,
    animationAmount: 10,
    animationDelay: 10,
    animationSpeed: 1,
    cssProperty: 'padding-left',
    moveMax: 1000
  }

  ngAfterContentInit(): void {
    this.updateAnimation.subscribe((event) => console.log(event));
  }
}

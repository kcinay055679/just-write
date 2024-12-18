import {AfterContentInit, Component} from '@angular/core';
import {AnimateDirective, AnimationConfig} from "../animate.directive";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-entity-management',
  imports: [
    AnimateDirective
  ],
  templateUrl: './entity-management.component.html',
  styleUrl: './entity-management.component.scss'
})
export class EntityManagementComponent implements AfterContentInit {
  config:AnimationConfig;

  constructor(private readonly gameService: GameService) {
    this.config = {
      path: 'assets/animations/animation.json',
      animationEvents:  this.gameService.eventsSubject,
      animationAmount: 10,
      animationDelay: 10,
      animationSpeed: 1,
      cssProperty: 'padding-left',
      moveMax: 1000
    }
  }

  ngAfterContentInit(): void {
    this.gameService.eventsSubject.subscribe((event) => console.log("test", event));
  }
}

import {Component} from '@angular/core';
import {TextFieldComponent} from "../../components/text-field/text-field.component";
import {PointsCounterComponent, ProgressBarConfig} from "../../components/points-counter/points-counter.component";
import {AnimationEvent} from "../../enums/AnimationEvent";
import {AnimateDirective, AnimationConfig} from "../../animate.directive";
import {Subject} from "rxjs";
import {GameService} from "../../services/game.service";
import {NgOptimizedImage} from "@angular/common";
import {PointsHandler} from "../../points-handler";

@Component({
    selector: 'app-game-page',
    imports: [TextFieldComponent, PointsCounterComponent, AnimateDirective, NgOptimizedImage],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
    startBlockLife = 200;
    currentBlockLife = 0;
    lifePoints = new PointsHandler(20, 1);


    config: AnimationConfig = {
        path: 'assets/animations/animation.json',
        animationEvents: new Subject<AnimationEvent>(),
        animationAmount: 10,
        animationDelay: 10,
        animationSpeed: 1,
        cssProperty: 'padding-left',
        moveMax: 1000
    }

    progressBarConfig: ProgressBarConfig = {
        initialValue: 0,
        min: 0,
        max: 100,
        fillColor: 'primary',
        updateSubject: new Subject<number>()
    }

    constructor(private readonly gameService: GameService) {
        this.gameService.textSubject.subscribe(([old, next]: [string, string]) => this.handleTextInput(old, next));
    }

    backward() {
        this.config.animationEvents.next(AnimationEvent.BACKWARD);

    }

    forward() {
        this.config.animationEvents.next(AnimationEvent.FORWARD);
    }

    handleTextInput(old: string, next: string) {
        if (old.length > next.length) {
            this.backward();
        } else {
            this.forward();
        }
        const wordBlocks = next.split(' ');
        this.currentBlockLife = this.startBlockLife - wordBlocks.length+1;
    }
}

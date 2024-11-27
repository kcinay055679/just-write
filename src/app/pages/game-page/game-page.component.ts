import {Component} from '@angular/core';
import {TextFieldComponent} from "../../components/text-field/text-field.component";
import {PointsCounterComponent} from "../../components/points-counter/points-counter.component";
import {AnimationEvent} from "../../enums/AnimationEvent";
import {AnimateDirective, AnimationConfig} from "../../animate.directive";
import {Subject} from "rxjs";
import {GameService} from "../../services/game.service";

@Component({
    selector: 'app-game-page',
    imports: [TextFieldComponent, PointsCounterComponent, AnimateDirective],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
    startBlockLife = 200;
    currentBlockLife = 0;

    animationEventSubject: Subject<AnimationEvent> = new Subject<AnimationEvent>();
    config: AnimationConfig = {
        path: 'assets/animations/animation.json',
        animationEvents: this.animationEventSubject,
        animationAmount: 10,
        animationDelay: 10,
        animationSpeed: 1,
        cssProperty: 'padding-left',
        moveMax: 1000
    }

    constructor(private gameService: GameService) {
        this.gameService.textSubject.subscribe(([old, next]: [string, string]) => this.handleTextInput(old, next));
    }

    next() {
        this.animationEventSubject.next(AnimationEvent.BACKWARD);
    }

    back() {
        this.animationEventSubject.next(AnimationEvent.FORWARD);
    }

    handleTextInput(old: string, next: string) {
        if (old.length > next.length) {
            this.next();
        } else {
            this.back();
        }
        const wordBlocks = next.split(' ');
        this.currentBlockLife = this.startBlockLife - wordBlocks.length+1;
    }
}

import {Component} from '@angular/core';
import {TextFieldComponent} from "../../components/text-field/text-field.component";
import {PointsCounterComponent, ProgressBarConfig} from "../../components/points-counter/points-counter.component";
import {AnimationEvent} from "../../enums/AnimationEvent";
import {Subject} from "rxjs";
import {GameService} from "../../services/game.service";
import {PointsHandler} from "../../points-handler";
import {EntityManagementComponent} from "../../entitiy-management/entity-management.component";

@Component({
    selector: 'app-game-page',
    imports: [TextFieldComponent, PointsCounterComponent, EntityManagementComponent],
    templateUrl: './game-page.component.html',
    styleUrl: './game-page.component.scss'
})
export class GamePageComponent {
    startBlockLife = 200;
    wordCount = 0;
    lifePoints = new PointsHandler(20, 1);

    progressBarConfig: ProgressBarConfig = {
        pointsHandler: this.lifePoints,
        fillColor: 'primary',
    }

    constructor(private readonly gameService: GameService) {
        this.gameService.textSubject.subscribe(([old, next]: [string, string]) => this.handleTextInput(this.formatText(old), this.formatText(next)));
    }

    backward() {
        this.gameService.eventsSubject.next(AnimationEvent.BACKWARD);
    }

    forward() {
        this.gameService.eventsSubject.next(AnimationEvent.FORWARD);
    }

    handleTextInput(old: string, next: string) {
        if (old.length > next.length) {
            this.backward();
        } else {
            this.forward();
        }
        const wordBlocks = next.split(' ');
        this.wordCount = wordBlocks.length;
    }

    formatText(text:string){
        return text.replace(/\s\s+/g, ' ').trim();
    }
}

import {AfterContentChecked, AfterContentInit, Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {AnimationEvent} from "./enums/AnimationEvent";
import {concatMap, delay, EMPTY, expand, last, mergeMap, of, Subject, switchMap, take, takeUntil, tap} from "rxjs";

export interface AnimationConfig {
    path: string;
    animationEvents: Subject<AnimationEvent>;
    animationAmount: number;
    animationDelay:number
    cssProperty: string;
    moveMax: number;
}

@Directive({
    selector: '[appAnimate]'
})
export class AnimateDirective implements AfterContentInit, OnDestroy {
    // config
    @Input() config!: AnimationConfig;
    animationSpeed: number = 1;
    currentPadding: number = 0;
    destroy: Subject<void> = new Subject();
    animationQueue: Subject<AnimationEvent> = new Subject();


    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    ngAfterContentInit(): void {
        this.config.animationEvents.pipe(takeUntil(this.destroy)).subscribe((event) => this.animationHandler(event));
        this.animationQueue.pipe(
            takeUntil(this.destroy),
            concatMap( item => of(item).pipe(delay(this.config.animationDelay)))
        ).subscribe(e=>this.animate(e));
    }

    ngOnDestroy(): void {
        this.destroy.next()
    }

    animationHandler(event: AnimationEvent) {
        for (let i = 0; i < this.config.animationAmount; i++) {
            this.animationQueue.next(event);
        }
    }

    animate(event: AnimationEvent) {
            this.setPadding(event)
            this.applyPadding()
    }

    setPadding(event: AnimationEvent) {
        switch (event) {
            case AnimationEvent.FORWARD:
                this.currentPadding += this.animationSpeed;
                break;
            case AnimationEvent.BACKWARD:
                this.currentPadding -= this.animationSpeed;
                break;
        }

        if (this.currentPadding >= this.config.moveMax) {
            this.currentPadding = 0;
        }
    }

    applyPadding() {
        this.renderer.setStyle(this.elementRef.nativeElement, this.config.cssProperty, `${this.currentPadding}px`);
    }
}

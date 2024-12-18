import {AfterContentInit, Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {AnimationEvent} from "./enums/AnimationEvent";
import {concatMap, delay, of, Subject, takeUntil} from "rxjs";

export interface AnimationConfig {
    path: string;
    animationEvents: Subject<AnimationEvent>;
    animationAmount: number;
    animationDelay: number
    cssProperty: string;
    moveMax: number;
    animationSpeed: number;
}

@Directive({
    selector: '[appAnimate]'
})
export class AnimateDirective implements AfterContentInit, OnDestroy {
    // config
    @Input() config!: AnimationConfig;
    currentStyleValue: number = 0;
    destroy: Subject<void> = new Subject();
    animationQueue: Subject<AnimationEvent> = new Subject();


    constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
    }

    ngAfterContentInit(): void {
        this.config.animationEvents.pipe(takeUntil(this.destroy)).subscribe((event) => this.animationHandler(event));
        this.animationQueue.pipe(
            takeUntil(this.destroy),
            concatMap(item => of(item).pipe(delay(this.config.animationDelay)))
        ).subscribe(e => this.animate(e));
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
        this.setStyle(event)
        this.applyStyle()
    }

    setStyle(event: AnimationEvent) {
        switch (event) {
            case AnimationEvent.FORWARD:
                this.currentStyleValue += this.config.animationSpeed;
                break;
            case AnimationEvent.BACKWARD:
                this.currentStyleValue -= this.config.animationSpeed;
                break;
        }

        if (this.currentStyleValue >= this.config.moveMax) {
            this.currentStyleValue = 0;
        }
    }

    applyStyle() {
        this.renderer.setStyle(this.elementRef.nativeElement, this.config.cssProperty, `${this.currentStyleValue}px`);
    }
}

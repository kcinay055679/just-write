import {AfterContentChecked, AfterContentInit, Directive, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {AnimationEvent} from "./enums/AnimationEvent";
import {delay, last, Subject, switchMap, takeUntil, tap} from "rxjs";

export interface AnimationConfig {
    path: string;
    animationEvents: Subject<AnimationEvent>;
    animationAmount: number;
    cssProperty: string;
    moveMax: number;
}

@Directive({
    selector: '[appAnimate]'
})
export class AnimateDirective implements AfterContentInit, OnDestroy {
    // config
    @Input() appAnimate!: AnimationConfig;
    animationSpeed: number = 1;
    private currentPadding: number = 0;
    private destroy: Subject<void> = new Subject();

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }

    ngAfterContentInit(): void {
        this.appAnimate.animationEvents
            .pipe(takeUntil(this.destroy))
            .subscribe((event) => this.animate(event));
    }

    ngOnDestroy(): void {
        this.destroy.next()
    }

    private animate(event: AnimationEvent) {
        for (let i = 0; i < this.appAnimate.animationAmount; i++) {
            this.setPadding(event)
            this.applyPadding()
        }
    }

    private setPadding(event: AnimationEvent) {
        switch (event) {
            case AnimationEvent.FORWARD:
                this.currentPadding += this.animationSpeed;
                break;
            case AnimationEvent.BACKWARD:
                this.currentPadding -= this.animationSpeed;
                break;
        }

        if (this.currentPadding >= this.appAnimate.moveMax) {
            this.currentPadding = 0;
        }
    }

    private applyPadding() {
        this.renderer.setStyle(this.elementRef.nativeElement, this.appAnimate.cssProperty, `${this.currentPadding}px`);
    }
}

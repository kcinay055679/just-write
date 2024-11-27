import {Directive, ElementRef, EventEmitter, Input, Renderer2} from '@angular/core';
import {AnimationEvent} from "./enums/AnimationEvent";

export interface AnimationConfig{
    path:string;
    events:EventEmitter<AnimationEvent>;
}

@Directive({
  selector: '[appAnimate]'
})
export class AnimateDirective {

  @Input() config!: AnimationConfig;
  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
    this.config.events.subscribe((event:AnimationEvent) => {
      switch(event){
        case AnimationEvent.FORWARD:
          this.animateForward();
          break;
        case AnimationEvent.BACKWARD:
          this.animateBackward();
          break;
      }
    });
  }

  private animateBackward() {

  }

  private animateForward() {

  }
}

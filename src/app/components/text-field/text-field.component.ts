import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {distinctUntilChanged, map, pairwise, tap} from "rxjs";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-text-field',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent implements OnInit{
  text = new FormControl('');

  constructor(private gameService: GameService) {
  }
  ngOnInit(): void {
    this.text.valueChanges.pipe(
        map(e => e || ""),
        distinctUntilChanged(),
        pairwise()
    ).subscribe(([old, next]:[string, string])=>this.gameService.textSubject.next([old, next]));
  }
}

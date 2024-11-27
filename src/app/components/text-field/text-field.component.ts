import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {distinctUntilChanged, map, tap} from "rxjs";

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

  ngOnInit(): void {
    this.text.valueChanges.pipe(
        map(e => e || ""),
        distinctUntilChanged(),
        tap(e=>console.log(e)
        )
    ).subscribe()
  }
}

import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Output()
  emmiter: EventEmitter<string> = new EventEmitter<string>();

  onKey(input: string) {
    this.emmiter.emit(input)
  }

  constructor() { }

  ngOnInit() {
  }

}

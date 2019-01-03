import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chapter-step',
  templateUrl: './chapter-step.component.html',
  styleUrls: ['./chapter-step.component.scss']
})
export class ChapterStepComponent implements OnInit {

  @Input()
  nav: any;

  constructor() { }

  ngOnInit() {
  }

}

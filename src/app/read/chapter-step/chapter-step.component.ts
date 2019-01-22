import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'chapter-step',
  templateUrl: './chapter-step.component.html',
  styleUrls: ['./chapter-step.component.scss']
})
export class ChapterStepComponent implements OnInit {

  @Input('prev-uri')
  prevUri: string;
  @Input('next-uri')
  nextUri: string;
  @Input('prev-label')
  prevLabel: string;
  @Input('next-label')
  nextLabel: string;

  constructor() { }

  ngOnInit() {
  }

}

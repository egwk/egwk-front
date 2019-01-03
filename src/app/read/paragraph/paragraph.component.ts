import {Component, Input, OnInit} from '@angular/core';
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ReadParagraphComponent implements OnInit {

  @Input() paragraph;
  @Input() showOriginal = AppSettings.DEFAULT_SHOW_ORIGINAL;

  constructor() { }

  ngOnInit() {
  }

}

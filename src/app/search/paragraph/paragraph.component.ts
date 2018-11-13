import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Paragraph, Similarity} from "../../models/search-result.model";
import {SearchSettings} from "../search.component";
import * as Diff from "text-diff";

@Component({
  selector: 'search-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() paragraph: Paragraph;
  @Input() similarity: Similarity;
  @Input() currentQuery: string;
  @Input() parent: Paragraph = null;
  @Input('settings') settings: SearchSettings = new SearchSettings();
  @Output() useAsReference = new EventEmitter();

  diff = new Diff();

  constructor() {
  }

  ngOnInit() {
  }

  diffHtml(text1: string, text2: string) {
    return this.diff.prettyHtml(this.diffSemanticCleanup(this.diff.main(text1, text2)));
  }

  diffSemanticCleanup(diffArray) {
    this.diff.cleanupSemantic(diffArray);
    return diffArray;
  }

  emitUseAsReference(paraId: string): void {
    this.useAsReference.emit(paraId);
  }
}

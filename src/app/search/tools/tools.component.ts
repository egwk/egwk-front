import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchResult} from "../../models/search-result.model";
import {SearchSettings} from "../search.component";

@Component({
  selector: 'search-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  @Input() result: SearchResult;
  @Input('settings') settings: SearchSettings = new SearchSettings();
  @Input() similars = [];
  @Input() showSimilars: Function;

  constructor() {
  }

  ngOnInit() {
  }

  toggleFilter(): void {
    this.settings.showDiff = !this.settings.showDiff;
  }

  toggleSimilars(paraId: string): void {
    this.similars[paraId] = this.similars[paraId] !== undefined ? undefined : true;
  }

  toggleDeletions(): void {
    this.settings.showDeletions = !this.settings.showDeletions;
  }

}

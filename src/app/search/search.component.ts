import {Component, OnInit} from '@angular/core';
import {EgwkSearchService} from "../services/egwk-search.service";
import {SearchResultPaginatied} from "../models/search-result.model";
import {Observable} from "rxjs/internal/Observable";

export class SearchSettings {
  showSimilarsDefault: boolean = false;
  showDiff: boolean = true;
  showDeletions: boolean = false;
  covers: number = 50;
  covered: number = 50;
  equalCoverage: boolean = true;
}

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  result: SearchResultPaginatied;
  currentQuery: string;
  similars = [];
  settings = new SearchSettings();

  constructor(
    private searchService: EgwkSearchService,
  ) {
  }

  ngOnInit() {
  }

  covers($event) {
    if (this.settings.equalCoverage) {
      this.settings.covered = this.settings.covers;
    }
  }

  covered(event) {
  }

  equalCoverage(event) {
    if (this.settings.equalCoverage) {
      this.settings.covered = this.settings.covers;
    }
  }

  showSimilars(paraId: string): boolean {
    return this.similars[paraId] !== undefined;
  }

  useAsReference(paraId: string): void {
    this.search('writings', this.currentQuery, paraId);
  }

  search(target: string, query: string, reference: string = null) {
    this.similars = [];
    this.result = null;
    this.currentQuery = query;
    let covered = this.settings.equalCoverage ? null : this.settings.covered;
    this.searchService.search(query, this.settings.covers, covered, reference).subscribe(
      result => this.result = <SearchResultPaginatied>result
    );
  }
}

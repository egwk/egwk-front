import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EgwkSearchService} from "../services/egwk-search.service";
import {SearchResultPaginatied} from "../models/search-result.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {AppSettings} from "../app.settings";

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

  @ViewChild('query', {read: ElementRef}) query: ElementRef;

  result: SearchResultPaginatied;
  currentQuery: string;
  currentReference = null;
  perPage = 25;
  similars = [];
  settings = new SearchSettings();

  constructor(
    private searchService: EgwkSearchService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
  }

  searchByRoute() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        let query = params['q'];
        let page = params['p'];
        if (query) {
          this.query.nativeElement.value = query;
          this.search('writings', query, null, page);
        }
      });
  }

  loadByroute() {
    return this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
          /*
          this.translationCode = params.get('translation');
          this.code = this.translationCode.split('.').shift();
          if (params.has('page')) {
            this.page = parseInt(params.get('page'));
          } else {
            this.page = 1;
          }
          return this.loadPage(this.code, this.translationCode, this.page, this.limit);
          */
          return '';
        }
      )
    )
  }

  ngOnInit() {
    this.searchByRoute();
  }

  pageEvent($event) {
    this.perPage = $event.pageSize;
    this.search('writings', this.currentQuery, this.currentReference, $event.pageIndex + 1, this.perPage);
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

  useAsReference(paraId: string, page = 1): void {
    this.currentReference = paraId;
    this.search('writings', this.currentQuery, this.currentReference, page, this.perPage);
  }

  search(target: string, query: string, reference: string = null, page = 1, perPage = 25) {
    this.similars = [];
    this.result = null;
    this.currentQuery = query;
    let covered = this.settings.equalCoverage ? null : this.settings.covered;
    this.searchService.search(query, this.settings.covers, covered, reference, page, perPage).subscribe(
      result => this.result = <SearchResultPaginatied>result
    );
  }

  onKeydown($event) {
    if ($event.key === "Enter") {
      this.search('writings', this.query.nativeElement.value, this.currentReference, 1, this.perPage);
    }
  }
}

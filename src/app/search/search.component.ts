import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EgwkSearchService} from "../services/egwk-search.service";
import {SearchResultPaginatied} from "../models/search-result.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {AppSettings} from "../app.settings";
import {register} from "ts-node";

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

  @ViewChild('queryElement', {read: ElementRef}) queryElement: ElementRef;

  result: SearchResultPaginatied;
  query: string;
  reference = null;
  target = '*';
  page = 1;
  limit = 25;
  similars = [];
  settings: SearchSettings = new SearchSettings();

  constructor(
    private searchService: EgwkSearchService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
  }

  ngOnInit() {
    this.searchByRoute();
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

  pageEvent($event) {
    /*
    length: 245
    pageIndex: 0
    pageSize: 25
    previousPageIndex:
     */
    this.navigateSearch(null, null, null, $event.pageIndex + 1, $event.pageSize);
  }

  covers($event) {
    if (this.settings.equalCoverage) {
      this.settings.covered = this.settings.covers;
    }
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
    this.navigateSearch(null, null, paraId, page, null);
  }

  navigateSearch(query: string, target: string, reference: string = null, page = null, limit = null) {
    this.target = target ? target : this.target;
    this.page = page ? page : this.page;
    this.limit = limit ? limit : this.limit;
    this.reference = reference ? reference : this.reference;
    this.query = query ? query : this.query;
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.query,
        t: this.target,
        r: this.reference,
        p: this.page,
        l: this.limit,
      }
    });
  }

  searchByRoute() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        let query = params['q'];
        let target = params['t'] ? params['t'] : '*';
        let page = params['p'] ? params['p'] : 1;
        let reference = params['r'] ? params['r'] : null;
        let limit = params['l'] ? params['l'] : this.limit;
        if (query) {
          this.queryElement.nativeElement.value = query;
          this.search(query, target, reference, page, limit);
        }
      });
  }

  search(query: string, target: string, reference: string = null, page = 1, limit = 25) {
    this.similars = [];
    this.result = null;
    this.query = query;
    let covered = this.settings.equalCoverage ? null : this.settings.covered;
    this.searchService.search(query, this.settings.covers, covered, reference, page, limit).subscribe(
      result => this.result = <SearchResultPaginatied>result
    );
  }

  onKeydown($event) {
    if ($event.key === "Enter") {
      this.navigateSearch(this.queryElement.nativeElement.value, null, null, 1, null);
    }
  }

  toggleDiff(): void {
    this.settings.showDiff = !this.settings.showDiff;
  }

  toggleDeletions(): void {
    this.settings.showDeletions = !this.settings.showDeletions;
  }

}

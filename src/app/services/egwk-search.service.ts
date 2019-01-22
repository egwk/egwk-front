import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {AppSettings} from "../app.settings";
import {SearchResult, SearchResultPaginatied} from "../models/search-result.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EgwkSearchService {

  constructor(
    protected http: HttpClient,
  ) {
  }

  search(phrase: string, covers: number = null, covered: number = null, reference: string = null, page = 1, perPage = 25): Observable<SearchResultPaginatied> {
    let lang = 'hu'; // todo
    let uri = AppSettings.API_URL + `reader/search/cluster/${lang}?query=${phrase}`;

    if (covers !== null && covered === null) {
      uri += `&cover=${covers}`;
    } else if (covers !== null && covered !== null) {
      uri += `&covers=${covers}&covered=${covered}`;
    }

    if (reference !== null) {
      uri += `&reference=${reference}`;
    }

    if (page > 1) {
      uri += `&page=${page}`;
    }

    if (perPage != 25) {
      uri += `&per_page=${perPage}`;
    }

    return this.http.get<SearchResultPaginatied>(uri)
      .pipe(
        map(item => {
          if (typeof item.data === 'object') {
            item.data = Object.values(item.data);
          }
          return item;
        })
      );
  }

}

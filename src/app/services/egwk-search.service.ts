import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {AppSettings} from "../app.settings";
import {SearchResultPaginatied} from "../models/search-result.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EgwkSearchService {

  constructor(
    protected http: HttpClient,
  ) {
  }

  search(phrase: string, covers: number = null, covered: number = null, reference: string = null): Observable<SearchResultPaginatied> {
    let uri = AppSettings.API_URL + `reader/search/cluster?query=${phrase}`;

    if (covers !== null && covered === null) {
      uri += `&cover=${covers}`;
    } else if (covers !== null && covered !== null) {
      uri += `&covers=${covers}&covered=${covered}`;
    }

    if (reference !== null) {
      uri += `&reference=${reference}`;
    }

    return this.http.get<SearchResultPaginatied>(uri);
  }

}

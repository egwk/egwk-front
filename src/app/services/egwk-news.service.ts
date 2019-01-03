import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppSettings} from "../app.settings";

@Injectable({
  providedIn: 'root'
})
export class EgwkNewsService {

  constructor(
    protected http: HttpClient,
  ) {
  }

  protected getParams(extra = ''): string {
    return '?language=' + 'hu' + extra; // todo
  }

  protected common(uri, extra = ''): Observable<any> {
    return this.http.get(AppSettings.NEWS_API_URL + uri + this.getParams(extra));
  }

  pinned(): Observable<any> {
    return this.common('pinned/');
  }

  others(): Observable<any> {
    return this.common('others/');
  }

  books(): Observable<any> {
    return this.common('books/');
  }

  news(): Observable<any> {
    return this.common('news/');
  }

  all(): Observable<any> {
    return this.common('', '&summary');
  }

}

import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {AppSettings} from "../app.settings";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EgwkSynchService {

  constructor(
    protected http: HttpClient,
  ) {
  }

  getParams(page: number, limit: number): string {
    return `?per_page=${limit}&page=${page}`;
  }

  getLists(): Observable<any> {
    return this.http.get(AppSettings.SYNCH_API_URL + 'translations/');
  }

  getBook(code: string, translation: string, page: number, limit: number): Observable<any> {
    return this.http.get(AppSettings.SYNCH_API_URL + translation + this.getParams(page, limit));
  }

  saveBook(translation: Array<string>, translationCode: string, limit: number, page: number): Observable<any> {
    return this.http.post(
      AppSettings.SYNCH_API_URL + translationCode + this.getParams(page, limit),
      {
        translation: translation
      }
    );
  }
}

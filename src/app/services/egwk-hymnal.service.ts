import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {AppSettings} from "../app.settings";
import {HttpClient} from "@angular/common/http";
import {Hymnal} from "../models/hymnal.model";
import {map} from "rxjs/operators";
import {Hymn} from "../models/hymn.model";
import {HymnVerse} from "../models/hymn-verse.model";

@Injectable({
  providedIn: 'root'
})
export class EgwkHymnalService {

  constructor(
    protected http: HttpClient,
  ) {
  }

  getLanguages(): Observable<any> {
    return this.http.get(AppSettings.HYMNALS_API_URL + 'languages');
  }

  getHymnals(language: string = ''): Observable<Array<Hymnal>> {
    return this.http.get<Array<Hymnal>>(AppSettings.HYMNALS_API_URL + language);
  }

  getHymnal(slug: string, hymnNo = null): Observable<Array<Hymn>> {
    if (null !== hymnNo) {
      return this.http.get<Array<Hymn>>(AppSettings.HYMNAL_API_URL + slug + '/' + hymnNo);
    }
    return this.http.get<Array<Hymn>>(AppSettings.HYMNAL_API_URL + slug + '?per_page=1000').pipe(map<any, Array<Hymn>>(item => item.data));
  }

  getHymn(slug: string, no: string, verse: string = ''): Observable<Array<HymnVerse>> {
    return this.http.get<Array<HymnVerse>>(AppSettings.HYMN_API_URL + `${slug}/${no}/${verse}`);
  }

  getTranslation(language: string, slug: string, no: string, verse: string = ''): Observable<any> {
    return this.http.get(AppSettings.HYMN_API_URL + `translate/${language}/${slug}/${no}/${verse}`);
  }

  getScore(type: string, slug: string, no: string, verse: string = ''): Observable<Blob> {
    return this.http.get(AppSettings.HYMN_API_URL + `score/${type}/${slug}/${no}/${verse}`, {responseType: 'blob'});
  }

}

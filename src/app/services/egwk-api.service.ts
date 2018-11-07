import {Injectable} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../app.settings";

@Injectable({
  providedIn: 'root'
})
export class EgwkApiService {

  constructor(private http: HttpClient) {
  }

  getParams(page: number, limit: number): string {
    return `?per_page=${limit}&page=${page}`;
  }

  getUri(code: string, translation: string): string {
    return `synch/${code}/${translation}`;
  }

  getBook(code: string, translation: string, page: number, limit: number): Observable<any> {
    return this.http.get(AppSettings.API_URL + this.getUri(code, translation) + this.getParams(page, limit));
  }

  saveBook(translation: Array<string>, translationCode: string, limit: number, page: number): Observable<any> {
    return this.http.post(
      AppSettings.API_URL + `synch/${translationCode}` + this.getParams(page, limit),
      {
        translation: translation
      }
    );
  }
}

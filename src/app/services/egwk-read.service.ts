import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AppSettings} from "../app.settings";

@Injectable({
  providedIn: 'root'
})
export class EgwkReadService {

  constructor(
    private authService: AuthService,
    protected http: HttpClient
  ) {
  }

  getParams(page: number, limit: number): string {
    return `?per_page=${limit}&page=${page}`;
  }

  test() {
    this.authService.accessToken;
  }

  getBooks() {
    this.authService.accessToken;
    return this.http.get(
      AppSettings.READER_API_URL + 'books' + this.getParams(1, 1000),
      this.authService.accessToken
      );
  }

  getBook(code: string, translation: string, page: number, limit: number): Observable<any> {
    // todo
    return this.http.get(AppSettings.READER_API_URL + translation + this.getParams(page, limit));
  }

}

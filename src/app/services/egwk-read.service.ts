import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {AppSettings} from "../app.settings";
import {PaginatedModel} from "../models/paginated.model";
import {BookModel} from "../models/bookModel";
import {map} from "rxjs/operators";
import {ParamMap} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EgwkReadService {

  language = 'hu'; // todo: i18n
  protected _collections = [];

  constructor(
    private authService: AuthService,
    protected http: HttpClient,
    protected ls: LocalStorageService,
  ) {
  }

  getParams(page?: number, limit?: number, language = null): string {
    if (!page) {
      return '';
    }
    let params = `?per_page=${limit}&page=${page}`;
    if (language) {
      params += '&language=' + language;
    }
    return params;
  }

  test() {
    // this.authService.accessToken;
  }

  transformBookList(result: PaginatedModel<BookModel>) {
    let books = [];
    let booksInCollection = [];
    let collection = null;
    let collectionName = null;
    result.data.forEach(item => {
      if (collection !== item.primary_collection_text_id) {
        if (booksInCollection.length > 0) {
          books.push({
            collectionId: collection,
            collection: collectionName,
            books: booksInCollection
          });
          booksInCollection = [];
        }
        collection = item.primary_collection_text_id;
        collectionName = item.collection_name;
      }
      booksInCollection.push(item);
    });
    return books;
  }

  getBooks(): Observable<any> {
    return this.http.get<PaginatedModel<BookModel>>(
      AppSettings.READER_API_URL + 'books' + this.getParams(1, 1000, this.language)
      // , this.authService.accessToken
    ).pipe(map(result => this.transformBookList(result)));
  }

  getBook(code: string, translation: string, page: number, limit: number): Observable<any> {
    // todo
    return this.http.get(AppSettings.READER_API_URL + translation + this.getParams(page, limit, this.language));
  }

  protected getContentCommon(uri: string, metadata, page?: number, limit?: number): Observable<any> {
    return this.http.get(AppSettings.READER_API_URL + (metadata ? 'metadata/' : '') + uri + this.getParams(1, 1000));
  }

  getContent(uri: string, page?: number, limit?: number): Observable<any> {
    return this.getContentCommon(uri, false, page, limit);
  }

  getContentMetadata(uri: string, page?: number, limit?: number): Observable<any> {
    return this.getContentCommon(uri, true, page, limit);
  }

  get collections(): Array<any> {
    if (this._collections.length <= 0) {
      this.storeCollections();
    }
    return this._collections;
  }

  getCollections(): Observable<any> {
    return this.http.get(AppSettings.READER_API_URL + 'collections/' + this.language);
  }

  getCollectionName(textId: string) {
    return this.collections
      .filter(item => item.text_id === textId)
      .map(item => item.translation)
      .pop();
  }

  storeCollections() {
    const collections = this.ls.get('collections');
    if (collections) {
      this._collections = collections;
    } else {
      this.getCollections()
        .subscribe(collections => {
          this._collections = collections;
          this.ls.set('collections', this._collections);
        });
    }
  }

}

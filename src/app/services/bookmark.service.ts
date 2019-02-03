import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarks: Set<string> = new Set();

  constructor() {
  }

  // todo: add API calls

  toggleBookmark(paraId: string): void {
    this.bookmarks.has(paraId) ?
    this.bookmarks.delete(paraId) :
    this.bookmarks.add(paraId);
  }

  addBookmark(paraId: string): void {
    this.bookmarks.add(paraId);
  }

  isBookmarked(paraId: string): boolean {
    return this.bookmarks.has(paraId);
  }


}

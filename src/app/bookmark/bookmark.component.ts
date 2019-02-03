import {Component, Input, OnInit} from '@angular/core';
import {BookmarkService} from "../services/bookmark.service";

@Component({
  selector: 'bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  @Input('para-id') paraId;
  bookmarked = false;

  constructor(
    private bookmarkService: BookmarkService
  ) {
  }

  ngOnInit() {
  }

  toggleBookmark(): void {
    this.bookmarkService.toggleBookmark(this.paraId);
  }

  isBookmarked(): boolean {
    return this.bookmarkService.isBookmarked(this.paraId);
  }

}

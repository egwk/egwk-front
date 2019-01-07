import {Component, OnInit} from '@angular/core';
import {EgwkReadService} from "../../services/egwk-read.service";
import {BookModel} from "../../models/bookModel";
import {PaginatedModel} from "../../models/paginated.model";
import {AppSettings} from "../../app.settings";
import {LocalStorageService} from "../../services/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-egw-writings',
  templateUrl: './writings.component.html',
  styleUrls: ['./writings.component.scss']
})
export class WritingsComponent implements OnInit {

  grid: boolean = false;
  booksQuery: Array<any>;
  columns = ['tr_code', 'tr_title', 'translator', 'title', 'publisher', 'year', 'church_approved'];
  fragment: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected readService: EgwkReadService,
    protected ls: LocalStorageService
  ) {
  }

  getBooks() {
    const booksQueryJson = this.ls.get('books');
    if (booksQueryJson) {
      this.booksQuery = booksQueryJson;
    } else {
      this.readService
        .getBooks()
        .subscribe(result => {
          this.booksQuery = result;
          this.ls.set('books', this.booksQuery);
        });
    }
  }

  ngOnInit() {
    // this.readService.test();
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
    this.getBooks();
  }

  ngAfterViewChecked(): void {
    try {
      if (this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) {
    }
  }

}

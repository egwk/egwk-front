import {Component, OnInit} from '@angular/core';
import {EgwkReadService} from "../../services/egwk-read.service";

@Component({
  selector: 'app-egw-writings',
  templateUrl: './writings.component.html',
  styleUrls: ['./writings.component.scss']
})
export class WritingsComponent implements OnInit {

  books = [];

  constructor(
    protected readService: EgwkReadService
  ) {
  }

  ngOnInit() {
    this.readService.test();
    /*
    this.readService
      .getBooks()
      .subscribe(result => {
        // this.books = result.data;
      });
      */
  }

}

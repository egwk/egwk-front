import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EgwkReadService} from "../../services/egwk-read.service";
import {AppSettings} from "../../app.settings";
import {MatBottomSheet} from "@angular/material";
import {ParagraphPropertiesComponent} from "../paragraph-properties/paragraph-properties.component";
import {TranslatedParagraphModel} from "../../models/paragraph.model";

@Component({
  selector: 'read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  chapter: any;
  metadata: any;
  showOriginal = AppSettings.DEFAULT_SHOW_ORIGINAL;
  private touchTime = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected readService: EgwkReadService,
    private paragraphProperties: MatBottomSheet
  ) {
  }

  getCollectionName(textId: string) {
    return this.readService
      .getCollectionName(textId);
  }

  getChapter(uri) {
    this.chapter = undefined;
    this.metadata = undefined;
    this.readService.getContent(uri).subscribe(chapter => {
      this.chapter = chapter;
      console.log(this.chapter);
    });
    this.readService.getContentMetadata(uri).subscribe(metadata => {
      this.metadata = metadata;
      console.log(this.metadata);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(r => {
      let uri = this.router.url.slice(1);
      this.getChapter(uri);
    });
  }


  toggleShowOriginal() {
    this.showOriginal = !this.showOriginal;
  }

  openParagraphProperties($event, paragraph: TranslatedParagraphModel, book) {
    let paragraphPropertiesRef = this.paragraphProperties.open(ParagraphPropertiesComponent, {
      panelClass: 'paragraph-properties',
      data: {
        paragraph: paragraph,
        book: book
      }
    });
    let instance = paragraphPropertiesRef.instance;
  }

  openParagraphPropertiesWithDblClickHack($event, paragraph, book) {
    if (this.touchTime == 0) {
      // set first click
      this.touchTime = new Date().getTime();
    } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - this.touchTime) < 800) {
        // double click occurred
        this.openParagraphProperties($event, paragraph, book);
        this.touchTime = 0;
      } else {
        // not a double click so set as a new first click
        this.touchTime = new Date().getTime();
      }
    }
  }

  prevChapter($event) {
    // todo: if swipe configured
    // this.router.navigateByUrl(this.metadata.nav.prev[0].chapter_uri);
  };

  nextChapter($event) {
    // todo: if swipe configured
    // this.router.navigateByUrl(this.metadata.nav.next[0].chapter_uri);
  };

}

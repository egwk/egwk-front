import {Component, OnInit, ViewChild} from '@angular/core';
import {EgwkSynchService} from "../../services/egwk-synch.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'synch-select',
  templateUrl: './synch-select.component.html',
  styleUrls: ['./synch-select.component.scss']
})
export class SynchSelectComponent implements OnInit {

  @ViewChild('bookCodesSelect') bookCodesSelect;

  translations: Array<string> = [];
  translation: string;
  bookCode: string;

  constructor(
    private synchService: EgwkSynchService,
  ) {
  }

  ngOnInit() {
    this.synchService.getLists().subscribe(
      response => this.translations = response.translations
    );
  }

  getUrl(translationCode: string): string {
    return '/' + AppSettings.SYNCH_API_URI + translationCode;
  }

  translationChange(translationCode) {
    this.bookCode = translationCode.split('.').shift();
  }

}

import {Component, OnInit} from '@angular/core';
import {EgwkHymnalService} from "../../services/egwk-hymnal.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Hymnal} from "../../models/hymnal.model";
import {AppSettings} from "../../app.settings";
import {AuthGuard} from "../../auth/auth.guard";

@Component({
  selector: 'app-hymnals',
  templateUrl: './hymnals.component.html',
  styleUrls: ['./hymnals.component.scss']
})
export class HymnalsComponent implements OnInit {

  constructor(
    private hymnalService: EgwkHymnalService,
    private route: ActivatedRoute,
  ) {
  }

  language: string;
  hymnals: Array<Hymnal>;

  canEdit() {
    return this.hymnalService.canEditHymnal();
  }

  loadByroute() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          let language = params.get('language');
          this.language = language === null ? '' : language;
          return this.hymnalService.getHymnals(this.language);
        }
      )
    );
  }

  getHymnalUrl(hymnal: Hymnal) {
    return '/' + AppSettings.HYMNAL_API_URI + hymnal.slug;
  }

  ngOnInit() {
    this.loadByroute().subscribe(hymnals => this.hymnals = hymnals);
  }

}

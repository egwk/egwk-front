import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {EgwkHymnalService} from "../services/egwk-hymnal.service";
import {Hymn} from "../models/hymn.model";
import {AppSettings} from "../app.settings";
import {Hymnal} from "../models/hymnal.model";

@Component({
  selector: 'app-hymnal',
  templateUrl: './hymnal.component.html',
  styleUrls: ['./hymnal.component.scss']
})
export class HymnalComponent implements OnInit {

  constructor(
    private hymnalService: EgwkHymnalService,
    private route: ActivatedRoute,
  ) {
  }

  hymnalMetadata: Hymnal = new Hymnal();
  hymnal: Array<Hymn>;

  getHymnalMetadata(slug) {
    this.hymnalService
      .getHymnalMetadata(slug)
      .subscribe(hymnal => {
        this.hymnalMetadata = hymnal.shift();
      });
  }

  loadByroute() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          let slug = params.get('hymnal');
          this.getHymnalMetadata(slug);
          return this.hymnalService.getHymnMetadata(slug);
        }
      )
    )
  }

  getHymnUrl(hymn: Hymn): string {
    return '/' + AppSettings.HYMN_API_URI + hymn.slug + '/' + hymn.hymn_no;
  }

  ngOnInit() {
    this.loadByroute().subscribe(hymnal => this.hymnal = hymnal);
  }
}

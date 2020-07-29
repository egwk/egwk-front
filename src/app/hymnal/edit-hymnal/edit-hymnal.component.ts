import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {EgwkHymnalService} from "../../services/egwk-hymnal.service";
import {Hymnal} from "../../models/hymnal.model";
import localeCode from 'iso-639-1';
import {startWith} from "rxjs/internal/operators/startWith";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-hymnal',
  templateUrl: './edit-hymnal.component.html',
  styleUrls: ['./edit-hymnal.component.scss']
})
export class EditHymnalComponent implements OnInit {

  hymnalId: string;
  hymnalMetadata: Hymnal = new Hymnal();
  loading: boolean;
  localeCode = localeCode;
  langControl = new FormControl();
  filteredLangCodes: Observable<string[]>;
  @ViewChild('slug', {read: ElementRef}) slug: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hymnalService: EgwkHymnalService,
  ) {
  }

  getHymnalMetadata(slug) {
    this.hymnalService
      .getHymnalMetadata(slug)
      .subscribe(hymnal => {
        let hymnalMetadata = hymnal.shift();
        this.hymnalMetadata = hymnalMetadata ? hymnalMetadata : new Hymnal();
        console.log(this.hymnalMetadata);
        this.loading = false;
      });
  }

  save() {
    this.hymnalMetadata.slug = this.slug.nativeElement.value;
    this
      .hymnalService
      .saveHymnalMetadata(this.hymnalMetadata)
      .subscribe(hymnal => {
        this.router.navigate(['/hymnal/' + this.hymnalMetadata.slug]);
      } ,(error) => {
      console.log("err", error);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        let slug = params.get('hymnal');
        if (slug) {
          this.loading = true;
          this.getHymnalMetadata(slug);
        } else {
          this.loading = false;
        }
      }
    );

    this.filteredLangCodes = this.langControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value.toString()))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.localeCode.getAllCodes().filter(option => option.toLowerCase().includes(filterValue));
  }
}

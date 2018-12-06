import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Hymn} from "../../models/hymn.model";
import {AppSettings} from "../../app.settings";
import {EgwkHymnalService} from "../../services/egwk-hymnal.service";
import {switchMap} from "rxjs/operators";
import {HymnVerse} from "../../models/hymn-verse.model";

@Component({
  selector: 'hymnVerses',
  templateUrl: './hymn.component.html',
  styleUrls: ['./hymn.component.css']
})
export class HymnComponent implements OnInit {

  constructor(
    private hymnalService: EgwkHymnalService,
    private route: ActivatedRoute,
  ) {
  }

  hymnVerses: Array<HymnVerse>;
  hymn: Hymn = new Hymn();
  scoreImage: any = null;
  translations: any = null;
  scoreLoading: boolean;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.scoreImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getScore(type: string, slug: string, no: string, verse: string = '') {
    this.scoreLoading = true;
    this.hymnalService.getScore(type, slug, no, verse).subscribe(data => {
      this.createImageFromBlob(data);
      this.scoreLoading = false;
    }, error => {
      this.scoreLoading = false;
      console.log(error);
    });
  }

  loadByroute() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          let slug = params.get('hymnal');
          let no = params.get('no');
          this.hymnalService.getHymnal(slug, no)
            .subscribe(hymn => {
              this.hymn = hymn.shift();
              this.hymnalService.getTranslation('all', slug, no)
                .subscribe(translations => this.translations = translations);
              this.getScore('SATB', slug, no, '1,2');
            });
          return this.hymnalService.getHymn(slug, no);
        }
      )
    )
  }

  ngOnInit() {
    this.loadByroute()
      .subscribe(hymn => this.hymnVerses = hymn);
  }
}

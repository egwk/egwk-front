import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Hymn} from "../../models/hymn.model";
import {EgwkHymnalService} from "../../services/egwk-hymnal.service";
import {switchMap} from "rxjs/operators";
import {HymnVerse} from "../../models/hymn-verse.model";
import {Hymnal} from "../../models/hymnal.model";
import {AuthGuard} from "../../auth/auth.guard";

@Component({
  selector: 'app-hymn-verses',
  templateUrl: './hymn.component.html',
  styleUrls: ['./hymn.component.scss']
})
export class HymnComponent implements OnInit {

  @ViewChild('scoreImageElement', {read: ElementRef}) scoreImageElement: ElementRef;
  @ViewChild('scoreImageWrapper', {read: ElementRef}) scoreImageWrapper: ElementRef;
  @ViewChild('hymnWrapper', {read: ElementRef}) hymnWrapper: ElementRef;
  @ViewChild('hymnBox', {read: ElementRef}) hymnBox: ElementRef;

  hHymn: number = null;
  topShift: number = 0;
  hymnVerses: Array<HymnVerse>;
  hymn: Hymn = new Hymn();
  hymnalMetadata: Hymnal = new Hymnal();
  scoreImage: any = null;
  noScore: boolean = false;
  translations: any = null;
  scoreLoading: boolean;

  constructor(
    private hymnalService: EgwkHymnalService,
    private route: ActivatedRoute,
    protected authGuard: AuthGuard,
  ) {
  }

  // todo: buggy!
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    // do the scroll trick only if the position is shorter than 1200
    if (windowScroll < 1200 &&  this.scoreImageElement &&  this.scoreImageWrapper &&  this.hymnWrapper &&  this.hymnBox) {
      const hScore = this.scoreImageElement.nativeElement.offsetHeight;
      this.hHymn = this.hHymn === null ? this.hymnBox.nativeElement.offsetHeight : this.hHymn;
      // console.info('hHymn: ' + this.hHymn + ' hScore: ' + hScore);
      const scoreBoxShift = 148;
      // do the scroll trick only if the Lyrics box is higher than the Score
      if (this.hHymn - scoreBoxShift > hScore) {
        const wScoreHymn = this.scoreImageWrapper.nativeElement.offsetWidth + this.hymnBox.nativeElement.offsetWidth;
        const wContainer = this.hymnWrapper.nativeElement.offsetWidth;
        // do the scroll trick only if the Container is wider than the Score and the Lyrics together
        if (scoreBoxShift <= windowScroll && wScoreHymn < wContainer) {
          this.topShift = window.pageYOffset - scoreBoxShift;
        } else {
          this.topShift = 0;
        }
      }
    } else {
      this.topShift = 0;
    }
  }

  canEdit() {
    return this.hymnalService.canEditHymn();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.scoreImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getScoreImage(slug: string, no: string) {
    this.hymnalService
      .getScoreImage(slug, no)
      .subscribe(data => {
        this.createImageFromBlob(data);
        this.scoreLoading = false;
      });
  }

  getScore(type: string, slug: string, no: string, verse: string = '') {
    this.scoreLoading = true;
    let size = 'normal';
    let header = 'on';
    if (window.innerWidth <= 576) {
      size = 'mobile';
      header = 'off';
    } else if (window.innerWidth <= 768) {
      size = 'tablet';
      header = 'off';
    }
    this.hymnalService.getScore(type, slug, no, verse, 'png', header, size).subscribe(data => {
      this.createImageFromBlob(data);
      this.scoreLoading = false;
    }, error => {
      if (true || this.canEdit()) { // todo!
        this.getScoreImage(slug, no);
      } else { // todo
        // this.scoreLoading = false;
        // this.noScore = true;
        // console.log(error);
      }
    });
  }

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
          let no = params.get('no');
          this.hymnalService.getHymnMetadata(slug, no)
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

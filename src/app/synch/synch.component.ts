import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {EgwkApiService} from "../services/egwk-api.service";
import {Location} from "@angular/common";

@Component({
  selector: 'synch',
  templateUrl: './synch.component.html',
  styleUrls: ['./synch.component.scss']
})
export class SynchComponent implements OnInit {

  // todo: CRITICAL: fix saving
  // todo: implement authentication
  // todo: implement "add source"
  // todo: add proportion multiplier depending on language

  book: any = {};
  pagination: any = {};
  selection: any;
  active: string;
  indexMap: Map<string, number> = new Map();
  indexMapRev: Map<number, string> = new Map();
  undo: Array<any> = [];
  redo: Array<any> = [];
  translationCode: string;
  code: string;
  limit = 100; // todo: should be configurable later.
  page = 1;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: EgwkApiService,
    private location: Location,
  ) {
  }

  reset() {
    this.selection = {};
    this.active = '';
    this.indexMap.clear();
    this.indexMapRev.clear();
    this.undo = [];
    this.redo = [];
  }

  loadByroute() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.code = params.get('code');
          this.translationCode = params.get('translation');
          if (params.has('page')) {
            this.page = parseInt(params.get('page'));
          } else {
            this.page = 1;
          }
          return this.loadPage(this.code, this.translationCode, this.page, this.limit);
        }
      )
    )
  }

  loadPage(code, translationCode, page, limit) {
    if (code === undefined || translationCode === undefined) {
      throw Error('No book code!')
    }
    this.loading = true;
    this.reset();
    return this.apiService.getBook(code, translationCode, page, limit);
  }

  setupBook(book) {
    this.book.original = book.original.data;
    book.original.data.forEach((item, i) => {
      this.indexMap.set(item.para_id, i);
      this.indexMapRev.set(i, item.para_id);
    });
    this.book.translation = book.translation.data.map(item => item.content);
    this.pagination = book.translation;
    delete this.pagination.data;
    this.loading = false;
  }

  setupUri(page) {
    let uri = this.apiService.getUri(this.code, this.translationCode);
    this.location.replaceState(`${uri}/${page}`);
  }

  ngOnInit() {
    this.loadByroute().subscribe(book => this.setupBook(book));
  }

  step(page) {
    if (page >= 1 && page <= this.pagination.last_page) {
      this
        .loadPage(this.code, this.translationCode, page, this.limit)
        .subscribe(book => {
            this.setupBook(book);
            this.setupUri(page);
          }
        );
    }
  }

  next() {
    this.step(++this.page);
  }

  prev() {
    this.step(--this.page);
  }

  prop(originalHtml: string, translation: string): number {
    if (originalHtml === undefined || translation === undefined) {
      return -1;
    }
    let cleanText = originalHtml.replace(/<\/?[^>]+(>|$)/g, "");
    return Math.floor(cleanText.length / translation.length * 1000) / 10;
  }

  protected _propColor(prop: number): string {
    let red = 255;
    let green = 255;
    let blue = 255;
    if (prop < 50) {
      red = 0;
      green = 0;
    } else if (prop <= 100) {
      red = Math.floor(255 * prop / 50 - 255);
      green = red;
    } else if (prop > 100 && prop <= 150) {
      blue = Math.floor(765 - 255 * prop / 50);
      green = blue;
    } else {
      green = 0;
      blue = 0;
    }
    return 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.5)';
  }

  propColor(originalHtml: string, translation: string): string {
    let prop = this.prop(originalHtml, translation);
    return this._propColor(prop)
  }

  activate(paraId: string) {
    let element = document.getElementById('egwk-synch-row-' + paraId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'center'});

      this.active = paraId;
    }
  }

  protected _merge(index: number) {
    this.book.translation[index] = this.book.translation[index] + ' ' + this.book.translation[index + 1];
  }

  protected merge(index: number) {
    if (this.book.translation[index] !== undefined && this.book.translation[index + 1] !== undefined) {

      this.undo.push({
        type: 'merge',
        index: index,
        text: this.book.translation[index],
        text2: this.book.translation[index + 1],
        startOffset: this.book.translation[index].length
      });
      this.redo = [];

      this._merge(index);
    }
  }

  mergeDown(index: number,) {
    this.merge(index);
    this._delete(index + 1);
  }

  mergeUp(index: number) {
    this.merge(index - 1);
    this._delete(index);
  }

  protected _cut(index: number, startOffset: number) {
    let text = this.book.translation[index];
    this._insert(index + 1);
    this.book.translation[index] = text.substring(0, startOffset - 1);
    this.book.translation[index + 1] = text.substring(startOffset);
  }

  cut(index: number) {
    if (this.selection !== undefined && this.selection.index === index) {

      let startOffset = this.selection.startOffset;

      this.undo.push({
        type: 'cut',
        index: index,
        startOffset: startOffset
      });
      this.redo = [];

      this._cut(index, startOffset);
    }
  }

  selectCutPosition(index: number, paraId: string) {
    if (paraId === this.active) {
      let range = window.getSelection().getRangeAt(0);
      this.selection = {
        startOffset: range.startOffset,
        index: index,
        paraId: paraId
      }
    } else {
      this.selection = undefined;
    }
  }

  protected _insert(index: number) {
    this.book.translation.splice(index, 0, '');
  }

  insert(index: number) {

    this.undo.push({
      type: 'insert',
      index: index
    });
    this.redo = [];

    this._insert(index);
  }

  protected _delete(index: number) {
    delete this.book.translation[index];
    this.book.translation = this.book.translation.filter(e => e !== undefined);
  }

  delete(index: number) {

    this.undo.push({
      type: 'delete',
      index: index,
      text: this.book.translation[index]
    });
    this.redo = [];

    this._delete(index);
  }

  saveBook() {
    let limit = this.pagination.per_page;
    let page = this.pagination.current_page;
    this.apiService
      .saveBook(this.book.translation, this.translationCode, limit, page)
      .subscribe(
        response => {
          console.log(response);
          this.step(this.page);
        }
      );
  }

  protected undoLast(last: any) {
    switch (last.type) {
      case 'merge':
        this.book.translation[last.index] = last.text2;
        this.book.translation.splice(last.index, 0, last.text);
        break;
      case 'cut':
        this._merge(last.index);
        this._delete(last.index + 1);
        break;
      case 'insert':
        this._delete(last.index);
        break;
      case 'delete':
        this.book.translation.splice(last.index, 0, last.text);
        break;
    }
  }

  protected redoLast(last: any) {
    switch (last.type) {
      case 'merge':
        this._merge(last.index);
        this._delete(last.index + 1);
        break;
      case 'cut':
        this._cut(last.index, last.startOffset);
        break;
      case 'insert':
        this._insert(last.index);
        break;
      case 'delete':
        this._delete(last.index);
        break;
    }
  }

  protected overrideDefault($event: KeyboardEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    $event.cancelBubble = true;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvents($event: KeyboardEvent) {
    let index = -1;
    if (this.indexMap.has(this.active)) {
      index = this.indexMap.get(this.active);
    }
    switch ($event.key) {
      case 'Escape':
        this.overrideDefault($event);
        this.active = '';
        break;
      case 'ArrowDown':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          this.mergeDown(index);
        } else {
          let nextParaId = this.indexMapRev.get(index + 1);
          this.activate(nextParaId);
        }
        break;
      case 'ArrowUp':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          this.mergeUp(index);
        } else {
          let prevParaId = this.indexMapRev.get(index - 1);
          this.activate(prevParaId);
        }
        break;
      case 'Delete':
        this.overrideDefault($event);
        this.delete(index);
        break;
      case 'Insert':
        this.overrideDefault($event);
        this.insert(index);
        break;
      case 'x':
      case 'X':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          this.cut(index);
        }
        break;
      case 'z':
      case 'Z':
      case 'Backspace':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          let last = this.undo.pop();
          if (last) {
            this.redo.push(last);
            this.undoLast(last);
          }
        }
        break;
      case 'y':
      case 'Y':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          let last = this.redo.pop();
          if (last) {
            this.undo.push(last);
            this.redoLast(last);
          }
        }
        break;
      case 's':
      case 'S':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          this.saveBook();
        }
        break;
      case 'ArrowRight':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          this.next();
        }
        break;
      case 'ArrowLeft':
        this.overrideDefault($event);
        if ($event.ctrlKey) {
          this.prev();
        }
        break;
    }
  }
}


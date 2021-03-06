import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {EgwkSynchService} from "../services/egwk-synch.service";
import {Location} from "@angular/common";
import {AppSettings} from "../app.settings";

@Component({
  selector: 'synch',
  templateUrl: './synch.component.html',
  styleUrls: ['./synch.component.scss']
})
export class SynchComponent implements OnInit {

  // todo: CRITICAL: fix merge up by page start / merge down by page start
  // todo: split into separate classes by functionality: undo/redo, gradient colors,
  // todo: implement commenting (eg. noting faulty translations, etc.)
  // todo: implement authentication
  // todo: add clickable pagination
  // todo: implement "add source"
  // todo: add proportion multiplier depending on language

  loading = true;
  book: any = {};
  active: string;

  protected pagination: any = {};
  protected textBeforeEdit: string;
  protected indexMap: Map<string, number> = new Map();
  protected indexMapRev: Map<number, string> = new Map();
  protected undoBuffer: Array<any> = [];
  protected redoBuffer: Array<any> = [];
  protected editing: number;
  protected translationCode: string;
  protected code: string;
  protected limit = 100; // todo: should be configurable later.
  protected page = 1;

  constructor(
    private route: ActivatedRoute,
    private synchService: EgwkSynchService,
    private location: Location,
  ) {
  }

  reset() {
    this.active = '';
    this.indexMap.clear();
    this.indexMapRev.clear();
    this.undoBuffer = [];
    this.redoBuffer = [];
  }

  loadByroute() {
    return this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          this.translationCode = params.get('translation');
          this.code = this.translationCode.split('.').shift();
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
    return this.synchService.getBook(code, translationCode, page, limit);
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
    this.location.replaceState(AppSettings.SYNCH_API_URI + `${this.translationCode}/${page}`);
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

  protected _merge(index: number, glue = ' ') {
    this.book.translation[index] = this.book.translation[index] + glue + this.book.translation[index + 1];
  }

  protected merge(index: number, glue = ' ') {
    if (this.book.translation[index] !== undefined && this.book.translation[index + 1] !== undefined) {

      this.undoBuffer.push({
        type: 'merge',
        index: index,
        glue: glue,
        text: this.book.translation[index],
        text2: this.book.translation[index + 1],
        startOffset: this.book.translation[index].length
      });
      this.redoBuffer = [];

      this._merge(index, glue);
    }
  }

  mergeDown(index: number, glue = ' ') {
    this.merge(index, glue);
    this._delete(index + 1);
  }

  mergeUp(index: number, glue = ' ') {
    this.merge(index - 1, glue);
    this._delete(index);
  }

  protected _cut(index: number, startOffset: number) {
    let text = this.book.translation[index];
    this._insert(index + 1);
    this.book.translation[index] = text.substring(0, startOffset - 1);
    this.book.translation[index + 1] = text.substring(startOffset);
  }

  cut(index: number) {
    let range = window.getSelection().getRangeAt(0);

    if (0 !== range.startOffset) {

      this.undoBuffer.push({
        type: 'cut',
        index: index,
        startOffset: range.startOffset
      });
      this.redoBuffer = [];

      this._cut(index, range.startOffset);
    }
  }

  protected _insert(index: number) {
    this.book.translation.splice(index, 0, '');
  }

  insert(index: number) {

    this.undoBuffer.push({
      type: 'insert',
      index: index
    });
    this.redoBuffer = [];

    this._insert(index);
  }

  protected _delete(index: number) {
    delete this.book.translation[index];
    this.book.translation = this.book.translation.filter(e => e !== undefined);
  }

  delete(index: number) {

    this.undoBuffer.push({
      type: 'delete',
      index: index,
      text: this.book.translation[index]
    });
    this.redoBuffer = [];

    this._delete(index);
  }

  focusOnTextarea(index: number) {
    let id = 'paragraph-edit-' + index;
    let target = document.getElementById(id);
    setTimeout(function () {
      target.focus();
    }, 0);
  }

  protected _edit(index: number) {
    this.focusOnTextarea(index);
    this.textBeforeEdit = this.book.translation[index];
    this.editing = index;
  }

  edit(index: number) {
    this._edit(index);
  }

  protected _doneEdit() {
    this.editing = undefined;
  }

  doneEdit(index: number) {

    this.undoBuffer.push({
      type: 'doneEdit',
      index: index,
      text1: this.textBeforeEdit,
      text2: this.book.translation[index]
    });
    this.redoBuffer = [];

    this._doneEdit();

  }

  isEditing(i = null) {
    return null === i ? this.editing !== undefined : this.editing === i;
  }

  saveBook() {
    let limit = this.pagination.per_page;
    let page = this.pagination.current_page;
    this.synchService
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
      case 'doneEdit':
        this.book.translation[last.index] = last.text1;
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
      case 'doneEdit':
        this.book.translation[last.index] = last.text2;
        break;
    }
  }

  protected undo() {
    let last = this.undoBuffer.pop();
    if (last) {
      this.redoBuffer.push(last);
      this.undoLast(last);
    }
  }

  protected redo() {
    let last = this.redoBuffer.pop();
    if (last) {
      this.undoBuffer.push(last);
      this.redoLast(last);
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
    if (this.editing !== undefined) {
      if ($event.key === 'Escape') {
        this._doneEdit();
        this.book.translation[index] = this.textBeforeEdit;
      } else if ($event.ctrlKey && $event.key.toUpperCase() === 'S') {
        this.overrideDefault($event);
        this.doneEdit(index);
      }
    } else {
      switch ($event.key) {
        case 'Escape':
          this.overrideDefault($event);
          this.active = '';
          break;
        case 'ArrowDown':
          this.overrideDefault($event);
          if ($event.ctrlKey) {
            let glue = ' ';
            if ($event.shiftKey && $event.altKey) {
              glue = " — ";
            } else if ($event.shiftKey) {
              glue = "\n";
            }
            this.mergeDown(index, glue);
          } else {
            let nextParaId = this.indexMapRev.get(index + 1);
            this.activate(nextParaId);
          }
          break;
        case 'ArrowUp':
          this.overrideDefault($event);
          if ($event.ctrlKey) {
            this.mergeUp(index, $event.shiftKey ? "\n" : ' ');
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
            this.undo();
          }
          break;
        case 'y':
        case 'Y':
          this.overrideDefault($event);
          if ($event.ctrlKey) {
            this.redo()
          }
          break;
        case 's':
        case 'S':
          this.overrideDefault($event);
          if ($event.ctrlKey) {
            this.saveBook();
          }
          break;
        case 'e':
        case 'E':
          this.overrideDefault($event);
          if ($event.ctrlKey) {
            this.edit(index);
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
}


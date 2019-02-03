import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../models/comment.model";
import {$e} from "codelyzer/angular/styles/chars";

@Component({
  selector: 'comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  @Input() comment: string = "";
  @Input('reset') resetAfterEdit = true
  @Output() commentChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  keyup($event) {
    if ($event.key === "Enter") {
      let comment: string = $event.target.value;
      this.commentChange.emit(comment);
      if (this.resetAfterEdit) {
        $event.target.value = '';
      }
    }

  }

}

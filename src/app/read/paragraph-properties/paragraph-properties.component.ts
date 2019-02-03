import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material";
import {TranslatedParagraphModel} from "../../models/paragraph.model";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/typings/bottom-sheet";
import {CommentModel} from "../../models/comment.model";

@Component({
  selector: 'paragraph-properties',
  templateUrl: './paragraph-properties.component.html',
  styleUrls: ['./paragraph-properties.component.scss']
})
export class ParagraphPropertiesComponent implements OnInit {

  panelOpenState = false;
  paragraph: TranslatedParagraphModel;
  book: any;
  myNotes: CommentModel[] = [
    {
      id: 1,
      user: 'me',
      date: '2019-01-01',
      comment: 'My important notes'
    }
  ]

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ParagraphPropertiesComponent>
  ) {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
  }

  notesChange() {
    console.log(this.myNotes);
  }


}

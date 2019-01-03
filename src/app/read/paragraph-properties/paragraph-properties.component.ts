import {Component, Inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from "@angular/material";
import {TranslatedParagraphModel} from "../../models/paragraph.model";
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/typings/bottom-sheet";

@Component({
  selector: 'paragraph-properties',
  templateUrl: './paragraph-properties.component.html',
  styleUrls: ['./paragraph-properties.component.css']
})
export class ParagraphPropertiesComponent implements OnInit {

  panelOpenState = false;
  paragraph: TranslatedParagraphModel;
  book: any;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ParagraphPropertiesComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
  }

}

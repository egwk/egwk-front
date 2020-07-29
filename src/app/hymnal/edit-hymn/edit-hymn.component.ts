import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edit-hymn',
  templateUrl: './edit-hymn.component.html',
  styleUrls: ['./edit-hymn.component.scss']
})
export class EditHymnComponent implements OnInit {

  scoreImage: any = null;

  editHymnForm = this.fb.group({
    lyrics: [''],
    score: this.fb.group({
      soprano: [''],
      alto: [''],
      tenor: [''],
      bass: ['']
    }),
    metadata: this.fb.group({
      title: [''],
      composer: [''],
      poet: [''],
      translation: [''],
      arranger: [''],
      tune: [''],
      tune_year: [''],
      lyrics_year: [''],
      scripture: [''],
      topic: [''],
      info: [''],
      copyright: [''],
    }),
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.editHymnForm.value);
  }
}

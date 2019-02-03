import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentModel} from "../models/comment.model";

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() for: string;
  @Input() type: string;
  @Input() comments: CommentModel[] = [];
  @Output() commentsChange = new EventEmitter();
  @Input() hide = {
    user: false,
    date: false,
    comment: false,
    toolbar: false
  };

  newComment: string = "";

  /*[
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
  {
    id: '',
    user:	'me',
    date: '2019-01-01',
    comment: 'My important notes'
  },
];*/

  constructor() {
  }

  ngOnInit() {
  }

  addComment($event) {
      this.comments.push(this.getComment($event));
      this.commentsChange.emit(this.comments)
  }

  getComment(comment: string): CommentModel {
    let id = Date.now();
    let date = new Date().toISOString();
    let user: string = 'me'; // todo
    return <CommentModel>{
      id: id,
      user: user,
      date: date,
      comment: comment
    };
  }

}

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentModel;
  @Input() hide = {
    user: false,
    date: false,
    comment: false,
    toolbar: false
  };

  editMode: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }
}

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() for: string;
  @Input() type: string;
  comments = [];
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

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}

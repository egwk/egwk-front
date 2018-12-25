import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  menu = [
    {id: 'bible', label: 'Bible'},
    {id: 'egw-writings', label: 'Ellen White Writings'},
    {id: 'other-books', label: 'Other Books'},
    {id: 'ssq', label: 'Sabbath School Quarterly'},
    {id: 'hymnals', label: 'Hymnals'},
    {id: 'projector', label: 'Projector'},
    {id: 'settings', label: 'Settings'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

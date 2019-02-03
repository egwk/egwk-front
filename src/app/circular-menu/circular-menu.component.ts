import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'circular-menu',
  templateUrl: './circular-menu.component.html',
  styleUrls: ['./circular-menu.component.scss']
})
export class CircularMenuComponent implements OnInit {

  show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchSettings} from "../../search/search.component";

@Component({
  selector: 'circular-menu-toggle-item',
  templateUrl: './toggle-item.component.html',
  styleUrls: ['./toggle-item.component.scss']
})
export class ToggleItemComponent implements OnInit {

  @Input('labels') labels = {
    on: 'on',
    off: 'off'
  };
  @Input('icons') icons = {
    on: 'indeterminate_check_box',
    off: 'add_box'
  };
  @Input('setting') setting: boolean = true;
  @Output() settingChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggle() {
    this.setting = !this.setting;
    this.settingChange.emit(this.setting);
  }

}


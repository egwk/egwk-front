import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {

  @Input('icons') icons = {
    on: 'indeterminate_check_box',
    off: 'add_box'
  };
  @Input('setting') setting: boolean = true;
  @Output() settingChange = new EventEmitter();

  constructor() {
  }

  toggle() {
    this.setting = !this.setting;
    this.settingChange.emit(this.setting);
  }

}

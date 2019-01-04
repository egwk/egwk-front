import {Component, OnInit} from '@angular/core';
import {AuthGuard} from "../../auth/auth.guard";

@Component({
  selector: 'egwk-dashboard-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(
    protected authGuard: AuthGuard,
  ) {
  }

  hasPermission(route: string) {
    return this.authGuard.hasPermission(route);
  }

  ngOnInit() {
  }

}

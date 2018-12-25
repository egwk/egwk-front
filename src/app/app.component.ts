import {Component} from '@angular/core';
import {TitleService} from './services/title.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  desktop = environment.desktop;

  constructor(private titleService: TitleService) {
    this.titleService.init();
  }
}

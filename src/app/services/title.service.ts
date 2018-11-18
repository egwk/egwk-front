import {Injectable} from '@angular/core';

import {Router, ActivatedRoute, RoutesRecognized} from '@angular/router';
import {filter, map} from "rxjs/operators";
import {Title} from '@angular/platform-browser';
import {AppSettings} from "../app.settings";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root",
})
export class TitleService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
  ) {
  }

  getRouteData(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof RoutesRecognized),
      map((event: RoutesRecognized) => {
        return event.state.root.firstChild.data;
      }));
  }

  init() {
    this.getRouteData()
      .subscribe(data => {
        let title = '';
        if (data.title) {
          title = data.title;
        } else {
          title = this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) {
              acc += AppSettings.APP_TITLE_SEPARATOR;
            }
            return acc + TitleService.ucFirst(frag);
          });
        }
        this.titleService.setTitle(AppSettings.APP_TITLE + AppSettings.APP_TITLE_SEPARATOR + title);
      });
  }

  static ucFirst(string) {
    if (!string) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

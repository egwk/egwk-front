import {Component} from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div class="egwk-search-results flex-center position-ref half-height">
      <div class="flex-center egwk-loading-wrapper">
        <img class="egwk-loading" src="/assets/images/egw_signo_gray_three_dots.svg"/>
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
}

import {Component, OnInit} from '@angular/core';

/*
#egwk-auth-social-twitter {
  &:hover {
    background-color: #1DA1F2;
  }

  i.egwk-auth-social {
    mask-image: url('/assets/images/social/twitter.svg');
  }
}

 */
@Component({
  selector: 'egwk-icon-sda',
  template: `<i class="icon-wrapper"><i class="sda-symbol"></i></i>`,
  styles: [
    'i.icon-wrapper {background-color: white;display: block;}',
    'i.sda-symbol {background-color: #e36520;width: 32px; height: 32px;mask-image: url("/assets/images/adventist-symbol--black.svg");-webkit-mask-image: url("/assets/images/adventist-symbol--black.svg");display: block;}',
  ]
})
export class SdaComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

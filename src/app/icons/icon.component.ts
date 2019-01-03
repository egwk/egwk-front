import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EgwkReadService} from "../services/egwk-read.service";

@Component({
  selector: 'egwk-icon',
  template: `
    <i #contentWrapper class="egwk-icon">
      <ng-content></ng-content>
      <i [ngClass]="{hidden: !this.contentText, 'egwk-icon-image': true}" 
           [ngStyle]="{'background-image': 'url(/assets/images/' + this.type + '/' + this.contentText + '.png)' }"
           ></i>
    </i>`,
  styles: [
    '.hidden {display: none;}',
    '.egwk-icon-image {display: inline-block; width:24px; height:24px; background-size: cover;}',
  ]
})
export class IconComponent {

  @ViewChild('contentWrapper') content: ElementRef;
  @Input() type: string = '';

  contentText: string;

  constructor(
    protected cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    let child = this.content.nativeElement.firstChild;
    this.contentText = child.nodeValue;
    this.content.nativeElement.removeChild(child)
    this.cdr.detectChanges();
  }

}

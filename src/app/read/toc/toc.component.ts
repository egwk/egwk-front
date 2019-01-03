import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EgwkReadService} from "../../services/egwk-read.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnInit {

  toc: any;
  metadata: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected readService: EgwkReadService,
    protected ls: LocalStorageService,
  ) {
  }

  getCollectionName(textId: string) {
    return this.readService
      .getCollectionName(textId);
  }

  getToc() {
    let uri = this.router.url.slice(1);
    let toc = this.ls.get('toc:' + uri);
    let metadata = this.ls.get('toc-metadata:' + uri);
    if (toc && metadata) {
      this.toc = toc;
      this.metadata = metadata;
    } else {
      this.readService.getContent(uri).subscribe(toc => {
        this.toc = toc;
        this.ls.set('toc:' + uri, this.toc);
        console.log(this.toc);
      });
      this.readService.getContentMetadata(uri).subscribe(metadata => {
        this.metadata = metadata.shift();
        this.ls.set('toc-metadata:' + uri, this.metadata);
        console.log(this.metadata);
      });
    }
  }

  ngOnInit() {
    this.getToc();
  }
}

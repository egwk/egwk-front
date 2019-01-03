import {Component, OnInit} from '@angular/core';
import {EgwkNewsService} from "../../services/egwk-news.service";

@Component({
  selector: 'egwk-dashboard-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: any;

  constructor(
    protected newsService: EgwkNewsService
  ) {
  }

  ngOnInit() {
    this.newsService.all().subscribe(news => this.news = news);
  }

}

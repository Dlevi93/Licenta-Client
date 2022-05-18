import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from '../../models/article.model';
import { LatestNewsService } from './latestNews.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latestNews.component.html',
  styleUrls: ['./latestNews.component.css']
})
export class LatestNewsComponent implements OnInit, OnDestroy {
  latestNews: Article[];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _articleService: LatestNewsService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initLatestArticles();
  }

  private initLatestArticles() {
    this._articleService.onNewArticlesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.latestNews = articles;
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  setArticleTime(date: string) {
    let dateUploaded = new Date(date);
    let now = new Date();
    var diff = (now.getTime() - dateUploaded.getTime()) / 1000;
    let minutes = diff / 60;
    let hours = minutes / 60;
    let days = hours / 24;

    let daysA = ~~days;
    let hoursA = ~~hours;

    if (daysA !== 0) {
      let mod = days - daysA;
      return `${daysA} zile și ${~~(mod * 24)} ore`;
    } else {
      if (hoursA === 0) {
        let mod = hours - hoursA;
        return `${~~(mod * 60)} minute`
      }
      let mod = hours - hoursA;
      return `${hoursA} ore și ${~~(mod * 60)} minute`;
    }
  }
}

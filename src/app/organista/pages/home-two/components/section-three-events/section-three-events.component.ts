import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/organista/shared/models/article.model';
import { HomeSectionThreeService } from './section-three-events.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ArticleFile } from 'src/app/organista/shared/models/file.model';

@Component({
  selector: 'app-section-three-events',
  templateUrl: './section-three-events.component.html',
  styleUrls: ['./section-three-events.component.css']
})
export class SectionThreeEventsComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;
  articles: Article[] = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _sectionService: HomeSectionThreeService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initArticles();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  initArticles() {
    this._sectionService.onArticlesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.articles = articles;
      });
  }

  setImageSize(file: ArticleFile, fileSize: string): string {
    let path = '';
    if (file.content.includes('.jpg') || file.content.includes('.png') || file.content.includes('.gif')) {
      let extension = file.content.substring(file.content.length - 4);
      path = file.content.substring(0, file.content.length - 4);
      path = path + '-' + fileSize + extension;
    }
    return path;
  }

  stripHtmlString(text) {
    return text.replace(/(<([^>]+)>)/gi, "");
  }
}

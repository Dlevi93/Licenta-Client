import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/organista/shared/models/article.model';
import { HomeSectionFiveService } from './section-five-other.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleFile } from 'src/app/organista/shared/models/file.model';

@Component({
  selector: 'app-section-five-other',
  templateUrl: './section-five-other.component.html',
  styleUrls: ['./section-five-other.component.css']
})
export class SectionFiveOtherComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;

  culture: Article[] = [];
  church: Article[] = [];
  notes: Article[] = [];
  onroad: Article[] = [];
  hungary: Article[] = [];
  foreign: Article[] = [];
  sport: Article[] = [];
  magazine: Article[] = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _sectionService: HomeSectionFiveService,
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
    this._sectionService.onCultureChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.culture = articles;
      });

    this._sectionService.onForeignChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.foreign = articles;
      });

    this._sectionService.onSportChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.sport = articles;
      });

    this._sectionService.onMagazineChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.magazine = articles;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { ArticleFile } from '../../models/file.model';

@Component({
  selector: 'app-related-articles',
  templateUrl: './relatedArticles.component.html',
  styleUrls: ['./relatedArticles.component.css']
})
export class RelatedArticlesComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;
  articles: Article[];

  private _componentReloaderSubscription: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private _sectionService: ArticleService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this._componentReloaderSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initRelatedArticles();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

    if (this._componentReloaderSubscription) {
      this._componentReloaderSubscription.unsubscribe();
    }
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

  private initRelatedArticles() {
    this._sectionService.onRelatedArticlesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(article => {
        this.articles = article;
      });
  }
}

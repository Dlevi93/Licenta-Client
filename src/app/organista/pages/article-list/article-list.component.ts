import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchArticleService } from '../../shared/services/searchArticle.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Article } from '../../shared/models/article.model';
import { environment } from 'src/environments/environment';
import { ArticleFile } from '../../shared/models/file.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  title = '';
  routeParams;
  baseUrl = `${environment.apiUrl}/`;

  asyncArticles: Observable<Article[]>;
  p: number = 1;
  total: number;
  loading: boolean;

  private _componentReloaderSubscription: any;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private _searchArticleService: SearchArticleService,
    private _titleService: Title,
  ) {
    this.routeParams = _route.snapshot.params;

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this._componentReloaderSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this._titleService.setTitle(`Licenta | ${this.routeParams.id}`);

    this.getPage(1);
  }

  ngOnDestroy(): void {
    if (this._componentReloaderSubscription) {
      this._componentReloaderSubscription.unsubscribe();
    }
  }

  getPage(page: number) {
    this.loading = true;
    if (this.routeParams.type === undefined) {
      this.getSearchPage(page);
    } else if (this.routeParams.type === "categorii") {
      this.getCategoryPage(page);
    }
  }

  getSearchPage(page) {
    this.title = `Căutare: ${this.routeParams.id}`;

    this.asyncArticles = this._searchArticleService.searchArticles(page, '', this.routeParams.id).pipe(
      tap((res: PaginatedArticles) => {
        this.total = res.rowCount;
        this.p = page;
        this.loading = false;
      }),
      map(res => res.results)
    );
  }

  getCategoryPage(page) {
    this.title = `Categorie: ${this.routeParams.id}`;

    this.asyncArticles = this._searchArticleService.searchArticles(page, this.routeParams.id, "").pipe(
      tap((res: PaginatedArticles) => {
        this.total = res.rowCount;
        this.p = page;
        this.loading = false;
      }),
      map(res => res.results)
    );
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
    if (text !== null)
      return text.replace(/(<([^>]+)>)/gi, "");
    return '';
  }

}

export interface PaginatedArticles {
  results: Article[];
  rowCount: number;
}
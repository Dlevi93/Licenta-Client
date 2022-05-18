import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/organista/shared/models/article.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeSectionOneService } from './section-one-selected.service';
import { environment } from 'src/environments/environment';
import { MostViewedArticleService } from 'src/app/organista/shared/services/mostViewedArticle.service';
import { AdService as AdsService } from 'src/app/organista/shared/services/advertisement.service';
import { Advertisement, AdPosition as AdPosition } from 'src/app/organista/shared/models/advertisement.model';
import { ArticleFile } from 'src/app/organista/shared/models/file.model';

@Component({
  selector: 'app-section-one-selected',
  templateUrl: './section-one-selected.component.html',
  styleUrls: ['./section-one-selected.component.css']
})
export class SectionOneSelectedComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;

  imagesOnTop = [];
  eventList = new Array<string>();

  leadingArticles: Article[];
  mostViewedArticles: Article[];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _sectionService: HomeSectionOneService,
    private _mostViewedArticlesService: MostViewedArticleService,
    private _adService: AdsService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initLeadingArticles();
    this.initMostViewedArticles();
    this.initAds();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private initLeadingArticles() {
    this._sectionService.onLeadingArticlesChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.leadingArticles = articles;
      });
  }

  private initMostViewedArticles() {
    this._mostViewedArticlesService.onMostViewedChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.mostViewedArticles = articles;
        this.setNewsEvents();
      });
  }

  private initAds() {
    this._adService.onadListChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(ads => {
        this.setImagesOnTop(ads);
      });
  }

  private setImagesOnTop(ads: Array<Advertisement>) {
    for (let index = 0; index < 8; index++) {
      ads.filter(x => x.position === AdPosition.Header).forEach(element => {
        this.imagesOnTop.push({ path: this.baseUrl + element.files[0].content, href: element.link })
      });
    }
  }

  private setNewsEvents() {
    this.mostViewedArticles.forEach(article => {
      let location = `${window.location.href}articol/${article.slug}`;
      this.eventList.push(`<a href='${location}'> ${article.title} </a>`);
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

  handleCarouselEvents(event) {
    if (event.name === "click") {
      window.open(event.image.href, "_blank")
    }
  }

  countClick(link: string) {
    let body = { link: link }
    this._sectionService.adClickLog(body).then(() => {
      window.open(link, "_blank");
    })
  }
}

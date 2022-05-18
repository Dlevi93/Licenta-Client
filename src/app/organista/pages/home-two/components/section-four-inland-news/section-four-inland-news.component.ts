import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from 'src/app/organista/shared/models/article.model';
import { Subject } from 'rxjs';
import { HomeSectionFourService } from './section-four-inland-news.service';
import { takeUntil } from 'rxjs/operators';
import { MostViewedArticleService } from 'src/app/organista/shared/services/mostViewedArticle.service';
import { AdService } from 'src/app/organista/shared/services/advertisement.service';
import { AdPosition } from 'src/app/organista/shared/models/advertisement.model';
import { ArticleFile } from 'src/app/organista/shared/models/file.model';

@Component({
  selector: 'app-section-four-inland-news',
  templateUrl: './section-four-inland-news.component.html',
  styleUrls: ['./section-four-inland-news.component.css']
})
export class SectionFourInlandNewsComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;
  clujnapoca: Article[] = [];
  cluj: Article[] = [];
  transilvania: Article[] = [];
  mostViewed: Article[] = [];
  news: Article[] = [];
  act: Article[] = [];

  imagesOnRight1 = [];
  imagesOnRight2 = [];
  imagesOnMiddle = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _sectionService: HomeSectionFourService,
    private _mostViewedArticleService: MostViewedArticleService,
    private _adService: AdService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initArticles();

    this.initInterests();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private initInterests() {
    this._adService.onadListChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(ads => {
        for (let index = 0; index < 6; index++) {
          this.setImagesOnRight1(ads);
          this.setImagesOnRight2(ads);
          this.setImagesOnBottomMiddle(ads);
        }
      });
  }

  private setImagesOnRight1(ads) {
    ads.filter(x => x.position === AdPosition.Middle1Right).forEach(element => {
      this.imagesOnRight1.push({ path: this.baseUrl + element.files[0].content, href: element.link })
    });
  }

  private setImagesOnRight2(ads) {
    ads.filter(x => x.position === AdPosition.Middle2Right).forEach(element => {
      this.imagesOnRight2.push({ path: this.baseUrl + element.files[0].content, href: element.link })
    });
  }

  private setImagesOnBottomMiddle(ads) {
    ads.filter(x => x.position === AdPosition.BottomBig).forEach(element => {
      this.imagesOnMiddle.push({ path: this.baseUrl + element.files[0].content, href: element.link })
    });
  }

  initArticles() {
    this._sectionService.onClujNapocaChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.clujnapoca = articles;
      });

    this._sectionService.onClujChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.cluj = articles;
      });

    this._sectionService.onTransilvaniaChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.transilvania = articles;
      });

    this._mostViewedArticleService.onMostViewedChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.mostViewed = articles;
      });

    this._sectionService.onNewsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.news = articles;
      });

    this._sectionService.onActChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(articles => {
        this.act = articles;
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

}

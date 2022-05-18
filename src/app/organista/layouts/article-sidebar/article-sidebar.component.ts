import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { Article } from '../../shared/models/article.model';

import { FacebookService, UIParams } from 'ngx-facebook';
import { AdService } from '../../shared/services/advertisement.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AdPosition, Advertisement } from '../../shared/models/advertisement.model';
import { environment } from 'src/environments/environment';
import { Output } from '@angular/core';

@Component({
  selector: 'app-article-sidebar',
  templateUrl: './article-sidebar.component.html',
  styleUrls: ['./article-sidebar.component.css']
})
export class ArticleSidebarComponent implements OnInit, OnDestroy {
  @Input() article: Article;
  baseUrl = `${environment.apiUrl}/`;
  @Output() fontSizeEmitter = new EventEmitter();

  imagesOnRight1 = [];
  imgAuthor: string;

  active14: string;
  active16: string = 'fc-green';
  active18: string;
  active20: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FacebookService,
    private _adService: AdService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initAds();
    this.initArticleInfo();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private initAds() {
    this._adService.onadListChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(ads => {
        for (let index = 0; index < 6; index++) {
          this.setImagesOnRight1(ads);
        }
      });
  }

  private initArticleInfo() {
    if (this.article !== undefined) {
      if (this.article.files !== undefined && this.article.files.length > 0) {
        console.log(this.article.files[0].author);
        if (this.article.files[0].author !== "Admin") {
          this.imgAuthor = this.article.files[0].author;
        }
      }
    }
  }

  private setImagesOnRight1(ads: Array<Advertisement>) {
    ads.filter(x => x.position === AdPosition.Middle1Right || x.position === AdPosition.Middle2Right).forEach(element => {
      this.imagesOnRight1.push({ path: this.baseUrl + element.files[0].content, href: element.link })
    });
  }

  shareOnFb() {
    const params: UIParams = {
      href: window.location.href,
      method: 'share',
    };

    this.fb.ui(params)
      .then()
      .catch();
  }

  handleCarouselEvents(event) {
    if (event.name === "click") {
      window.open(event.image.href, "_blank")
    }
  }

  changeFontSize(fontSize: string) {
    this.fontSizeEmitter.emit(fontSize);

    this.removeAllFontClasses();
    switch (fontSize) {
      case '14':
        this.active14 = 'fc-green';
        break;
      case '16':
        this.active16 = 'fc-green';
        break;
      case '18':
        this.active18 = 'fc-green';
        break;
      case '20':
        this.active20 = 'fc-green';
        break;
      default:
        break;
    }
  }

  removeAllFontClasses() {
    this.active14 = this.active16 = this.active18 = this.active20 = '';
  }
}

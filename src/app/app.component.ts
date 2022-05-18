import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, NavigationCancel, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FacebookService, InitParams } from 'ngx-facebook';
import { environment } from 'src/environments/environment';
import { ShareService } from './organista/shared/models/meta/meta.service';
import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Article } from './organista/shared/models/article.model';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    baseUrl = `${environment.apiUrl}/`;

    location: any;
    routerSubscription: any;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private document: any,
        private _httpClient: HttpClient,

        private router: Router,
        private _shareService: ShareService,
        fb: FacebookService,
    ) {
        if (isPlatformServer(platformId)) {
            this.initArticleOnServer();
        }
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.recallJsFuntions();
        }
    }

    recallJsFuntions() {
        this.router.events
            .subscribe(() => {
            });
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event => {
                $.getScript('assets/js/main.js');
                //   $('.andro_preloader').fadeOut('slow');
                this.location = this.router.url;
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }

    initArticleOnServer() {
        const path = this.document.location.pathname;

        if (path.includes('articol/')) {
            const lastPartOfPath = path.lastIndexOf('/');
            const slug = path.substring(lastPartOfPath + 1);

            this._httpClient.get(`${environment.apiUrl}/api/home/article/meta/${slug}`).subscribe(
                (result: Article) => {
                    this._shareService.setArticleAndFacebookTags(result);
                },
                error => {
                    console.log("***TLS ERROR***");
                    console.log(error);
                }
            );
        }
    }
}

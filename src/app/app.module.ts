import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxNewstickerAlbeModule } from 'ngx-newsticker-albe';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { IvyCarouselModule } from './ivyсarousel_pro/carousel.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { SocialLoginModule } from 'angularx-social-login';
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { HeaderTwoComponent } from './organista/layouts/header-two/header-two.component';
import { ArticleSidebarComponent } from './organista/layouts/article-sidebar/article-sidebar.component';
import { FooterComponent } from './organista/layouts/footer/footer.component';
import { ShopSidebarComponent } from './organista/layouts/shop-sidebar/shop-sidebar.component';
import { HomeTwoComponent } from './organista/pages/home-two/home-two.component';
import { ArticleListComponent } from './organista/pages/article-list/article-list.component';
import { ArticleComponent } from './organista/pages/article/article.component';
import { ErrorComponent } from './organista/pages/error/error.component';
import { LegalComponent } from './organista/pages/legal/legal.component';

import { SectionOneSelectedComponent } from './organista/pages/home-two/components/section-one-selected/section-one-selected.component';
import { SectionThreeEventsComponent } from './organista/pages/home-two/components/section-three-events/section-three-events.component';
import { SectionFourInlandNewsComponent } from './organista/pages/home-two/components/section-four-inland-news/section-four-inland-news.component';
import { SectionFiveOtherComponent } from './organista/pages/home-two/components/section-five-other/section-five-other.component';
import { NewsletterComponent } from './organista/shared/components/newsletter/newsletter.component';
import { LatestNewsComponent } from './organista/shared/components/latestNews/latestNews.component';
import { RelatedArticlesComponent } from './organista/shared/components/relatedArticles/relatedArticles.component';
import { LatestCommentComponent } from './organista/shared/components/latestComment/latestComment.component';
import { TermsComponent } from './organista/pages/terms/terms.component';
import { PolicyComponent } from './organista/pages/policy/policy.component';

import { HomeSectionOneService } from './organista/pages/home-two/components/section-one-selected/section-one-selected.service';
import { HomeSectionThreeService } from './organista/pages/home-two/components/section-three-events/section-three-events.service';
import { HomeSectionFourService } from './organista/pages/home-two/components/section-four-inland-news/section-four-inland-news.service';
import { HomeSectionFiveService } from './organista/pages/home-two/components/section-five-other/section-five-other.service';
import { ArticleService } from './organista/shared/services/article.service';
import { LatestNewsService } from './organista/shared/components/latestNews/latestNews.service';
import { MostViewedArticleService } from './organista/shared/services/mostViewedArticle.service';
import { NewsletterService } from './organista/shared/components/newsletter/newsletter.service';
import { SearchArticleService } from './organista/shared/services/searchArticle.service';
import { AdService } from './organista/shared/services/advertisement.service';
import { ShareService } from './organista/shared/models/meta/meta.service';
import { LatestCommentService } from './organista/shared/components/latestComment/latestComment.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderTwoComponent,
    ArticleSidebarComponent,
    FooterComponent,
    ShopSidebarComponent,
    HomeTwoComponent,
    ArticleListComponent,
    ArticleComponent,
    ErrorComponent,
    LegalComponent,
    PolicyComponent,
    TermsComponent,

    NewsletterComponent,
    LatestNewsComponent,
    RelatedArticlesComponent,
    LatestCommentComponent,

    SectionOneSelectedComponent,
    SectionThreeEventsComponent,
    SectionFourInlandNewsComponent,
    SectionFiveOtherComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxNewstickerAlbeModule,
    AppRoutingModule,

    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    IvyCarouselModule,
    NgxExtendedPdfViewerModule,
    ToastrModule.forRoot(),
    NgxCaptchaModule,
    NgxPaginationModule,
    SocialLoginModule,
    FacebookModule.forRoot(),
  ],
  providers: [
    HomeSectionOneService,
    HomeSectionThreeService,
    HomeSectionFourService,
    HomeSectionFiveService,

    ArticleService,
    LatestNewsService,
    MostViewedArticleService,
    LatestCommentService,
    NewsletterService,
    SearchArticleService,
    AdService,

    ShareService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
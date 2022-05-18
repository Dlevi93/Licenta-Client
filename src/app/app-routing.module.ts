import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeTwoComponent } from './organista/pages/home-two/home-two.component';
import { ArticleListComponent } from './organista/pages/article-list/article-list.component';
import { ArticleComponent } from './organista/pages/article/article.component';
import { LegalComponent } from './organista/pages/legal/legal.component';
import { ErrorComponent } from './organista/pages/error/error.component';
import { HomeSectionOneService } from './organista/pages/home-two/components/section-one-selected/section-one-selected.service';
import { HomeSectionThreeService } from './organista/pages/home-two/components/section-three-events/section-three-events.service';
import { HomeSectionFourService } from './organista/pages/home-two/components/section-four-inland-news/section-four-inland-news.service';
import { HomeSectionFiveService } from './organista/pages/home-two/components/section-five-other/section-five-other.service';
import { ArticleService } from './organista/shared/services/article.service';
import { LatestNewsService } from './organista/shared/components/latestNews/latestNews.service';
import { MostViewedArticleService } from './organista/shared/services/mostViewedArticle.service';
import { LatestCommentService } from './organista/shared/components/latestComment/latestComment.service';
import { AdService } from './organista/shared/services/advertisement.service';
import { PolicyComponent } from './organista/pages/policy/policy.component';
import { TermsComponent } from './organista/pages/terms/terms.component';

const routes: Routes = [
  {
    path: '', component: HomeTwoComponent,
    resolve: {
      sectionOne: HomeSectionOneService,
      latestNews: LatestNewsService,
      mostViewedArticles: MostViewedArticleService,
      latestComments: LatestCommentService,
      sectionThree: HomeSectionThreeService,
      sectionFour: HomeSectionFourService,
      sectionFive: HomeSectionFiveService,
      adList: AdService
    }
  },
  {
    path: 'articole/:id', component: ArticleListComponent,
  },
  {
    path: 'articole/:type/:id', component: ArticleListComponent,
  },
  {
    path: 'articol/:id', component: ArticleComponent,
    resolve: {
      data: ArticleService,
      latestNews: LatestNewsService,
      adList: AdService
    }
  },
  {
    path: 'legal', component: LegalComponent,
    resolve: {
      latestNews: LatestNewsService,
      adList: AdService
    }
  },
  {
    path: 'confidentialitate', component: PolicyComponent,
    resolve: {
      latestNews: LatestNewsService,
      adList: AdService
    }
  },
  {
    path: 'termene', component: TermsComponent,
    resolve: {
      latestNews: LatestNewsService,
      adList: AdService
    }
  },
  {
    path: '**', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

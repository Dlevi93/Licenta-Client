import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.model';
import { ToastrService } from 'ngx-toastr';
import { ShareService } from '../models/meta/meta.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleService implements Resolve<any>{
    baseUrl = `${environment.apiUrl}/`;

    routeParams: any;

    article: Article;
    relatedArticles: Article;

    onArticleChanged: BehaviorSubject<any>;
    onRelatedArticlesChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _toastr: ToastrService) {
        this.onArticleChanged = new BehaviorSubject({});
        this.onRelatedArticlesChanged = new BehaviorSubject({});
    }

    /**
 * Resolver
 *
 * @param {ActivatedRouteSnapshot} route
 * @param {RouterStateSnapshot} state
 * @returns {Observable<any> | Promise<any> | any}
 */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getArticleBySlug(),
                this.getRelatedArticles(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getArticleBySlug(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/article/${this.routeParams.id}`)
                .subscribe((response: any) => {
                    //this._shareService.setArticleAndFacebookTags(response);

                    this.article = response;
                    this.onArticleChanged.next(this.article);
                    resolve(response);
                }, reject);
        });
    }

    getArticleBySlugOnServer(slug: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/article/${slug}`)
                .subscribe((response: any) => {
                    this.article = response;
                    this.onArticleChanged.next(this.article);
                    resolve(response);
                }, reject);
        });
    }

    getRelatedArticles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/article/related/${this.routeParams.id}`)
                .subscribe((response: any) => {
                    this.relatedArticles = response;
                    this.onRelatedArticlesChanged.next(this.relatedArticles);
                    resolve(response);
                }, reject);
        });
    }

    addComment(formData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/api/comment/${this.routeParams.id}`, formData)
                .subscribe((response: any) => {
                    this.article.comments.push(response);
                    resolve(response);
                }, val => {
                    this._toastr.error(val.error, "Eroare!");
                    reject(val);
                });
        });
    }

    removeComment(formData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/api/comment/delete`, formData)
                .subscribe((response: any) => {
                    this.article.comments = this.article.comments.filter(x => x.id !== formData.id);
                    resolve(response);
                }, val => {
                    this._toastr.error(val.error, "Eroare!");
                    reject(val);
                });
        });
    }
}
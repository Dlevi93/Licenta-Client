import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from '../../models/article.model';

@Injectable()
export class LatestNewsService implements Resolve<any>{
    newArticles: Article[];

    onArticleChanged: BehaviorSubject<any>;
    onRelatedArticlesChanged: BehaviorSubject<any>;
    onNewArticlesChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
        this.onNewArticlesChanged = new BehaviorSubject({});
    }

    /**
 * Resolver
 *
 * @param {ActivatedRouteSnapshot} route
 * @param {RouterStateSnapshot} state
 * @returns {Observable<any> | Promise<any> | any}
 */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getLatestArticles()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getLatestArticles(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.newArticles !== undefined) {
                resolve(this.newArticles);
            } else {
                this._httpClient.get(`${environment.apiUrl}/api/home/latest`)
                    .subscribe((response: any) => {
                        this.newArticles = response;
                        this.onNewArticlesChanged.next(this.newArticles);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
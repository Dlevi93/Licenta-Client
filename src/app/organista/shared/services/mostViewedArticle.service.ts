import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable()
export class MostViewedArticleService implements Resolve<any>{
    routeParams: any;

    mostViewed: Article[];

    onMostViewedChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
        this.onMostViewedChanged = new BehaviorSubject({});
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
                this.getMostViewed(7),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getMostViewed(timeInDays: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/viewed/${timeInDays}`)
                .subscribe((response: any) => {
                    this.mostViewed = response;
                    this.onMostViewedChanged.next(this.mostViewed);
                    resolve(response);
                }, reject);
        });
    }
}
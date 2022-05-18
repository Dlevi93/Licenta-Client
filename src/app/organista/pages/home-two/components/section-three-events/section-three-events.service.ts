import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/organista/shared/models/article.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class HomeSectionThreeService implements Resolve<any>{
    routeParams: any;

    articles: Article[];
    onArticlesChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.onArticlesChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getArticles(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getArticles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/evenimente`)
                .subscribe((response: any) => {
                    this.articles = response;
                    this.onArticlesChanged.next(this.articles);
                    resolve(response);
                }, reject);
        });
    }
}
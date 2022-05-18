import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class HomeSectionOneService implements Resolve<any>{
    leadingArticles: any;

    onLeadingArticlesChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
        this.onLeadingArticlesChanged = new BehaviorSubject({});
    }

    /**
 * Resolver
 *
 * @param {ActivatedRouteSnapshot} route
 * @param {RouterStateSnapshot} state
 * @returns {Observable<any> | Promise<any> | any}
 */
    resolve(): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getLeadingArticles(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getLeadingArticles(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/leading`)
                .subscribe((response: any) => {
                    this.leadingArticles = response;
                    this.onLeadingArticlesChanged.next(this.leadingArticles);
                    resolve(response);
                }, reject);
        });
    }

    adClickLog(body): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/api/AdvertisementLog`, body)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
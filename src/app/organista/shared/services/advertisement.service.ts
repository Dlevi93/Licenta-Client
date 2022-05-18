import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Advertisement } from '../models/advertisement.model';

@Injectable()
export class AdService implements Resolve<any>{
    routeParams: any;

    adList: Advertisement[];

    onadListChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
        this.onadListChanged = new BehaviorSubject({});
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
                this.getAllAds(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getAllAds(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.adList !== undefined) {
                resolve(this.adList);
            }
            this._httpClient.get(`${environment.apiUrl}/api/home/getAllInterests`)
                .subscribe((response: any) => {
                    this.adList = response;
                    this.onadListChanged.next(this.adList);
                    resolve(response);
                }, reject);
        });
    }
}
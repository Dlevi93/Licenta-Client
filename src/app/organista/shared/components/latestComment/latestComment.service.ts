import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LatestCommentService implements Resolve<any>{
    comments: Comment[];
    onCommentChanged: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        this.onCommentChanged = new BehaviorSubject({});
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
                this.getLatestComments(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getLatestComments(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/comment/latest`)
                .subscribe((response: any) => {
                    this.comments = response;
                    this.onCommentChanged.next(this.comments);
                    resolve(response);
                }, reject);
        });
    }
}
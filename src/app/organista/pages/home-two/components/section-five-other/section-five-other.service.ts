import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/organista/shared/models/article.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable()
export class HomeSectionFiveService implements Resolve<any>{
    routeParams: any;

    culture: Article[];
    foreign: Article[];
    sport: Article[];
    magazine: Article[];

    onCultureChanged: BehaviorSubject<any>;
    onForeignChanged: BehaviorSubject<any>;
    onSportChanged: BehaviorSubject<any>;
    onMagazineChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.onCultureChanged = new BehaviorSubject({});
        this.onForeignChanged = new BehaviorSubject({});
        this.onSportChanged = new BehaviorSubject({});
        this.onMagazineChanged = new BehaviorSubject({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getCulture(),
                this.getForeign(),
                this.getSport(),
                this.getMagazine()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCulture(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/cultura`)
                .subscribe((response: any) => {
                    this.culture = response;
                    this.onCultureChanged.next(this.culture);
                    resolve(response);
                }, reject);
        });
    }

    getForeign(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/strainatate`)
                .subscribe((response: any) => {
                    this.foreign = response;
                    this.onForeignChanged.next(this.foreign);
                    resolve(response);
                }, reject);
        });
    }

    getSport(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/sport`)
                .subscribe((response: any) => {
                    this.sport = response;
                    this.onSportChanged.next(this.sport);
                    resolve(response);
                }, reject);
        });
    }

    getMagazine(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/magazin`)
                .subscribe((response: any) => {
                    this.magazine = response;
                    this.onMagazineChanged.next(this.magazine);
                    resolve(response);
                }, reject);
        });
    }
}
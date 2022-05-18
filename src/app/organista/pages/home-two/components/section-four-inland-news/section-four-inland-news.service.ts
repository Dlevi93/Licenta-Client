import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/organista/shared/models/article.model';
import { Resolve } from '@angular/router';

@Injectable()
export class HomeSectionFourService implements Resolve<any>{
    clujnapoca: Article[];
    cluj: Article[];
    transilvania: Article[];
    news: Article[];
    act: Article[];

    onClujNapocaChanged: BehaviorSubject<any>;
    onClujChanged: BehaviorSubject<any>;
    onTransilvaniaChanged: BehaviorSubject<any>;
    onNewsChanged: BehaviorSubject<any>;
    onActChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.onClujNapocaChanged = new BehaviorSubject({});
        this.onClujChanged = new BehaviorSubject({});
        this.onTransilvaniaChanged = new BehaviorSubject({});
        this.onNewsChanged = new BehaviorSubject({});
        this.onActChanged = new BehaviorSubject({});
    }

    resolve(): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
                this.getCjN(),
                this.getCj(),
                this.getT(),
                this.getNews(),
                this.getAct(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getCjN(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/clujnapoca`)
                .subscribe((response: any) => {
                    this.clujnapoca = response;
                    this.onClujNapocaChanged.next(this.clujnapoca);
                    resolve(response);
                }, reject);
        });
    }

    getCj(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/cluj`)
                .subscribe((response: any) => {
                    this.cluj = response;
                    this.onClujChanged.next(this.cluj);
                    resolve(response);
                }, reject);
        });
    }

    getT(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/transilvania`)
                .subscribe((response: any) => {
                    this.transilvania = response;
                    this.onTransilvaniaChanged.next(this.transilvania);
                    resolve(response);
                }, reject);
        });
    }

    getNews(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/stiri`)
                .subscribe((response: any) => {
                    this.news = response;
                    this.onNewsChanged.next(this.news);
                    resolve(response);
                }, reject);
        });
    }

    getAct(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${environment.apiUrl}/api/home/byCategory/actualitati`)
                .subscribe((response: any) => {
                    this.act = response;
                    this.onActChanged.next(this.act);
                    resolve(response);
                }, reject);
        });
    }
}
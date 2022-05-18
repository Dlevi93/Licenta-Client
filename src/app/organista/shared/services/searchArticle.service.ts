import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class SearchArticleService {
    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    searchArticles(page: number, categoryName: string, text: string) {
        return this._httpClient.get(`${environment.apiUrl}/api/home/search?page=${page}&categoryName=${categoryName}&text=${text}`);
    }
}
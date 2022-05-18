import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NewsletterService {
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _toastr: ToastrService
    ) {
    }

    subscribeToNewsletter(formData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.apiUrl}/api/newsletter`, formData)
                .subscribe((response: any) => {
                    this._toastr.success("Succes!");
                    resolve(response);
                }, val => {
                    this._toastr.error(val.error, "Eroare!");
                    reject(val);
                });
        });
    }
}
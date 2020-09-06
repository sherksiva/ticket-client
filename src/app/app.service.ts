import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forEach, isEmpty } from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { config } from './app.config';

@Injectable()
export class ApiService {

	constructor(
		private http: HttpClient,
    ) { }
    
    private formatErrors(error: any) {
		return throwError(error);
    }
    
	get(path: string, params: object = {}, pagination: boolean = false): Observable<any> {
		let queryParams = new HttpParams();
		if (!isEmpty(params)) {
			forEach(params, (value, key) => {
				queryParams = queryParams.append(key, value);
			});
		}
		return this.http.get(`${config.url}${path}`, { params: queryParams }).pipe(map((res: Response) => {
			return res;
		}), catchError(this.formatErrors.bind(this)));
	}

	put(path: string, body: object = {}, params: object = {}): Observable<any> {
		let queryParams = new HttpParams();
		if (!isEmpty(params)) {
			forEach(params, (value, key) => {
				queryParams = queryParams.append(key, value);
			});
		}
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

		return this.http.put(`${config.url}${path}`, JSON.stringify(body), { headers} ).pipe(map((res: Response) => {
			return res;
		}), catchError(this.formatErrors.bind(this)));
	}

}

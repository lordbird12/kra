import {
    HttpClient,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    filter,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import { environment } from 'environments/environment.development';
import { Form } from '@angular/forms';
import { DataTablesResponse } from 'app/shared/datatable.types';
const token = localStorage.getItem('accessToken') || null;

@Injectable({ providedIn: 'root' })
export class PageService {
    // Private
    private _data: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) { }

    httpOptionsFormdata = {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    create(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/page', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    payment_period(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/payment_period', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    claim(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/cleam', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    update(data: any): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/update_page', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    
    getpageCategories(): Observable<any[]> {
        return this._httpClient.get<any>(`${environment.baseURL}/api/get_page_category`).pipe(
            map((response) => response.data || []), // ใช้ data ที่เป็นอาเรย์
            catchError((error) => {
                console.error('Error fetching categories:', error);
                return of([]);
            })
        );
    }

    delete(id: any): Observable<any> {
        return this._httpClient.delete<any>(
            environment.baseURL + '/api/page/' + id,
            { headers: this.httpOptionsFormdata.headers }
        );
    }

    getById(id: any): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/page/' + id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getOrder(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_orders')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getPermission(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_permission')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    /**
     * Get products
     *
     *
     * @param page
     * @param perPage
     * @param sortBy
     * @param order
     * @param search
     */

    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.baseURL + '/api/page_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getClient(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_client')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getFinanace(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_finance')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getProduct($brand_model_id): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_product/' + $brand_model_id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getBrand(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_brand')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getCar(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_product_all')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getBrandModel($brand_id): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_brand_model/' + $brand_id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getClaim(id: any): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_cleam/' + id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getUserByDepartment(id: any): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_user_by_department/' + id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getPromotion(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_promotion')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getGarage(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_garage')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getPageCustomer(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.baseURL + '/api/client_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    customerCreate(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/client', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }


}

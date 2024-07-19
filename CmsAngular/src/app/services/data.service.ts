import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private baseUrl = "http://localhost:8080";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAll(endpoint: string, options: { headers?: HttpHeaders }): Observable<any> {
    if (options.headers) {
      this.httpOptions = { headers: options.headers };
    }
    return this.http.get(`${this.baseUrl}/${endpoint}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(endpoint: string, id: number, options: { headers?: HttpHeaders }): Observable<any> {
    if (options.headers) {
      this.httpOptions = { headers: options.headers };
    }
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(endpoint: string, item: any, options: { headers?: HttpHeaders}): Observable<any> {
    if (options.headers) {
      this.httpOptions = { headers: options.headers };
    }
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  update(endpoint: string, id: number, item: any, options: { headers?: HttpHeaders }): Observable<any> {
    if (options.headers) {
      this.httpOptions = { headers: options.headers };
    }
    return this.http.put<any>(`${this.baseUrl}/${endpoint}/${id}`, item, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  delete(endpoint: string, id: number, options: { headers?: HttpHeaders }): Observable<any> {
    if (options.headers) {
      this.httpOptions = { headers: options.headers };
    }
    return this.http.delete<any>(`${this.baseUrl}/${endpoint}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(endpoint: string, user:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${endpoint}`, user);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    alert("Un Expected error Occured. ");
    return throwError('Something went wrong; please try again later.');
  }


}

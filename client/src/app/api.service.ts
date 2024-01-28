import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';

export interface IURL {
  id: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  create(url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/url`, { url });
  }

  getReport(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/url/report/${id}`);
  }

  //set data 
  private idSource = new Subject<IURL>();

  urlData$ = this.idSource.asObservable();

  setData(data: IURL) {
    this.idSource.next(data);
  }
}

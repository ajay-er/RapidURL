import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

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

  private dataSource = new BehaviorSubject<IURL | null>(null);

  urlData$ = this.dataSource.asObservable();

  setData(data: IURL) {
    this.dataSource.next(data);
  }
}

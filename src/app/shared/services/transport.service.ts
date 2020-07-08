import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TransportService {

  originRoute = 'localhost:8080/api/';
  headers = {
   'Access-Control-Allow-Origin': '*',
   'Content-Type': 'application/json',
  };

  private token: string;

  constructor(
      private http: HttpClient,
  ) {

  }

  setToken(token: string): void {
    this.token = token;
  }

  get<T>(url: string, payload?: any): Observable<T> {
    return this.http.get<T>(`${this.originRoute}${url}`, { headers: this.headersForRequest, params: payload  });
  }

  post<T>(url: string, payload?: any): Observable<T> {
    return this.http.post<T>(`${this.originRoute}${url}`, payload, { headers: this.headersForRequest  });
  }

  put<T>(url: string, payload?: any): Observable<T> {
    return this.http.put<T>(`${this.originRoute}${url}`, payload, { headers: this.headersForRequest  });
  }

  delete<T>(url: string, payload?: any): Observable<T> {
    return this.http.delete<T>(`${this.originRoute}${url}`, { headers: this.headersForRequest, params: payload });
  }

  get headersForRequest(): { [param: string]: string | string[] }  {
    return { ...this.headers, 'Authorization': `Bearer ${this.token}` };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransportService } from './transport.service';
import { Observable, of } from 'rxjs';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { SignupRequestInterface } from '../interfaces/signup-request.interface';
import { pluck } from 'rxjs/operators';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private transport: TransportService) { }

  login(payload: LoginRequestInterface): Observable<string> {
    console.log(payload);
    return of('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJZZWxpc2VpZXYiLCJyb2xlIjoiQWRtaW4iLCJ0b2tlbkV4cGlyYXRpb25EYXRlIjoiMjAyMC0wNy0wOCAwMDowMDowMCIsImVtYWlsIjoibWljaGFlbGVsMTQxMUBnbWFpbC5jb20iLCJwaG9uZSI6IiszODA5NzcxMzY3ODUiLCJpc1ZlcmlmaWVkIjpmYWxzZSwianRpIjoiNjY2MGNiYzMtYTc1MC00Y2IxLWE5ZGYtMTcwOTBmZTBlMjA5IiwiaWF0IjoxNTk0MTM0NTczLCJleHAiOjE1OTQxMzgxNzN9.amO7fdHoiwTDNKLm8UV_hQbCvWO_dHJkCF8n3xjmKMk')
    return this.transport.post('login', payload).pipe(
        pluck('token'),
    );
  }

  signup(payload: SignupRequestInterface): Observable<string> {
    console.log(payload);
    return of('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJZZWxpc2VpZXYiLCJyb2xlIjoiQWRtaW4iLCJ0b2tlbkV4cGlyYXRpb25EYXRlIjoiMjAyMC0wNy0wOCAwMDowMDowMCIsImVtYWlsIjoibWljaGFlbGVsMTQxMUBnbWFpbC5jb20iLCJwaG9uZSI6IiszODA5NzcxMzY3ODUiLCJpc1ZlcmlmaWVkIjpmYWxzZSwianRpIjoiNjY2MGNiYzMtYTc1MC00Y2IxLWE5ZGYtMTcwOTBmZTBlMjA5IiwiaWF0IjoxNTk0MTM0NTczLCJleHAiOjE1OTQxMzgxNzN9.amO7fdHoiwTDNKLm8UV_hQbCvWO_dHJkCF8n3xjmKMk');
    return this.transport.post('signup', payload).pipe(
        pluck('token'),
    );
  }

  getProfileInfo(id: number): Observable<UserInterface> {
    return of({
      id: 1,
      firstName: 'Michael',
      lastName: 'Yeliseiev',
      phone: '+380977136785',
      email: 'michaelel1411@gmail.com',
              });
    return this.transport.get('user/get', { id }).pipe(
        pluck('user'),
    );
  }

  editProfileInfo(payload: UserInterface): Observable<UserInterface> {
    return of(payload);
    return this.transport.put('user/edit', payload).pipe(
        pluck('user'),
    );
  }
}

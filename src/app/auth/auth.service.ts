import { Injectable } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ApiService } from '../shared/services/api.service';
import { TransportService } from '../shared/services/transport.service';
import { LoginRequestInterface } from '../shared/interfaces/login-request.interface';
import { SignupRequestInterface } from '../shared/interfaces/signup-request.interface';
import { MomentService } from '../shared/services/moment.service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn: boolean;

  isLoginMode: boolean = true;

  isAuthInProgress: boolean;

  private targetPath: string;

  constructor(
      private userService: UserService,
      private api: ApiService,
      private transport: TransportService,
      private moment: MomentService,
      private router: Router,
  ) {
    this.tryToLoginFromLocalStorage();
  }

  tryToLoginFromLocalStorage(): void {
    const token = localStorage.getItem('user');
    if (token && this.moment.moment(jwtDecode(token).tokenExpirationDate).isAfter(this.moment.moment())) {
      this.userService.setUser(jwtDecode(token));
      this.isLoggedIn = true;
      this.transport.setToken(token);
    } else {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
    }
  }

  saveTargetPath(path: string): void {
    this.targetPath = path;
  }

  retrieveTargetPath(): string {
    return this.targetPath;
  }

  login(payload: LoginRequestInterface): void {
    this.isAuthInProgress = true;
    this.api.login(payload).subscribe(
        res => this.makeAfterLoginActions(res),
        e => alert(e || e.message),
    );
  }

  signup(payload: SignupRequestInterface): void {
    this.isAuthInProgress = true;
    this.api.signup(payload).subscribe(
        res => this.makeAfterLoginActions(res),
        e => alert(e || e.message),
    );
  }

  makeAfterLoginActions(token: string): void {
    this.isAuthInProgress = false;
    this.isLoggedIn = true;
    localStorage.setItem('user', token);
    this.userService.setUser(jwtDecode(token));
    this.transport.setToken(token);
    this.router.navigate([this.retrieveTargetPath() || `profile/${this.userService.user.id}`]);
  }

  logOut(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.userService.clearUser();
    this.transport.setToken(null);
    this.router.navigate(['auth']);
  }


}

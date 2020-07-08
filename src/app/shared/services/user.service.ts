import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _user: UserInterface;

  constructor() {
  }

  setUser(data: UserInterface): void {
    this._user = data;
  }

  clearUser(): void {
    this._user = null;
  }

  get isAdmin(): boolean {
    return this._user?.role === RolesEnum.Admin;
  }

  get isExpert(): boolean {
    return this._user?.role === RolesEnum.Expert;
  }

  get isVerified(): boolean {
    return this._user?.role === RolesEnum.Expert && this._user?.isVerified;
  }

  get user(): UserInterface {
    return this._user;
  }
}

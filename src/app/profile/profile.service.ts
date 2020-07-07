import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/interfaces/user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  profileId: number;
  profileInfo: UserInterface;

  constructor(
      private api: ApiService,
  ) { }

  getProfileInfo(): Observable<UserInterface> {
    return this.api.getProfileInfo(this.profileId);
  }

  editProfileInfo(payload: UserInterface): Observable<UserInterface> {
    return this.api.editProfileInfo(payload);
  }
}

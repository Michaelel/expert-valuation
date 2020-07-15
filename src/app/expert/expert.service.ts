import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../shared/interfaces/user.interface';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  expertList: UserInterface[];

  constructor(
      private api: ApiService,
  ) { }

  getExpertList(): Observable<UserInterface[]> {
    return this.api.getExpertList();
  }
}

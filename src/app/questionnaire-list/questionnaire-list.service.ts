import { Injectable } from '@angular/core';
import { QuestionnaireInterface } from '../shared/interfaces/questionnaire.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireListService {

  questionnaireList: QuestionnaireInterface[];

  constructor(
      private api: ApiService,
  ) { }

  getQuestionnaireList(token: string): Observable<QuestionnaireInterface[]> {
    return this.api.getQuestionnaireList(token);
  }

  createQuestionnaire(payload: QuestionnaireInterface): Observable<QuestionnaireInterface> {
    return this.api.createQuestionnaire(payload);
  }
}

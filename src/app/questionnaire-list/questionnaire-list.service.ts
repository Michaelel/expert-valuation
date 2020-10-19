import { Injectable } from '@angular/core';
import { QuestionnaireInterface } from '../shared/interfaces/questionnaire.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { QuestionnaireResultInterface } from '../shared/interfaces/questionnaire-result.interface';
import { ExpertInterface } from '../shared/interfaces/expert.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireListService {

  questionnaireId: number;

  questionnaireList: QuestionnaireInterface[];
  activeQuestionnaire: QuestionnaireInterface;

  constructor(
      private api: ApiService,
  ) { }

  getQuestionnaireList(token?: string): Observable<QuestionnaireInterface[]> {
    return this.api.getQuestionnaireList(token);
  }

  createQuestionnaire(payload: QuestionnaireInterface): Observable<QuestionnaireInterface> {
    return this.api.createQuestionnaire(payload);
  }

  getQuestionnaireResult(): Observable<ExpertInterface[]> {
    return this.api.getQuestionnaireResult(this.questionnaireId);
  }
}

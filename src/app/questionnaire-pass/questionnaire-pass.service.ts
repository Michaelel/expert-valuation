import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionInterface } from '../shared/interfaces/question.interface';
import { ApiService } from '../shared/services/api.service';
import { ExpertInterface } from '../shared/interfaces/expert.interface';
import { pluck } from 'rxjs/operators';
import { QuestionnaireInterface } from '../shared/interfaces/questionnaire.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionnairePassService {

  questionnaireId: number;
  questions: QuestionInterface[];

  constructor(
      private api: ApiService,
  ) { }

  getQuestionnaire(): Observable<QuestionnaireInterface> {
    return this.api.getQuestionnaire(this.questionnaireId);
  }

  passQuestionnaire(expert: ExpertInterface): Observable<any> {
    return this.api.passQuestionnaire(expert);
  }
}

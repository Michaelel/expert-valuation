import { Injectable } from '@angular/core';
import { QuestionInterface } from '../shared/interfaces/question.interface';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { QuestionnaireInterface } from '../shared/interfaces/questionnaire.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {

  questionnaireId: number;

  originQuestions: QuestionInterface[];
  questions: QuestionInterface[];
  questionnaire: QuestionnaireInterface;

  constructor(private api: ApiService) { }

  getQuestionnaireWithAnotherLinks(questionnaire: QuestionInterface[]): QuestionInterface[] {
    return questionnaire.map(item => ({ ...item, answers: item.answers.map(answer => ({ ...answer })) }));
  }

  getQuestionnaire(): Observable<QuestionnaireInterface> {
    return this.api.getQuestionnaire(this.questionnaireId);
  }

  editQuestionnaire(questionnaire: QuestionnaireInterface): Observable<QuestionnaireInterface> {
    return this.api.editQuestionnaire({ ...questionnaire, questions: this.questions, id: this.questionnaireId });
  }

}

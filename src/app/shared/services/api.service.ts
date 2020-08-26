import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransportService } from './transport.service';
import { Observable, of } from 'rxjs';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { SignupRequestInterface } from '../interfaces/signup-request.interface';
import { pluck } from 'rxjs/operators';
import { UserInterface } from '../interfaces/user.interface';
import { QuestionInterface } from '../interfaces/question.interface';
import { QuestionnaireInterface } from '../interfaces/questionnaire.interface';
import { ExpertInterface } from '../interfaces/expert.interface';
import { QuestionnaireResultInterface } from '../interfaces/questionnaire-result.interface';
import { ExpertAnswerInterface } from '../interfaces/expert-answer.interface';

@Injectable({
                providedIn: 'root',
            })
export class ApiService {

    constructor(private transport: TransportService) {
    }

    login(payload: LoginRequestInterface): Observable<string> {
        console.log(payload);
        return of('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiTWljaGFlbCIsImxhc3ROYW1lIjoiWWVsaXNlaWV2Iiwicm9sZSI6IkV4cGVydCIsInRva2VuRXhwaXJhdGlvbkRhdGUiOiIyMDIwLTA3LTA5IDAwOjAwOjAwIiwiZW1haWwiOiJtaWNoYWVsZWwxNDExQGdtYWlsLmNvbSIsInBob25lIjoiKzM4MDk3NzEzNjc4NSIsImlzVmVyaWZpZWQiOnRydWUsImp0aSI6IjY2NjBjYmMzLWE3NTAtNGNiMS1hOWRmLTE3MDkwZmUwZTIwOSIsImlhdCI6MTU5NDEzNDU3MywiZXhwIjoxNTk0MTY4NjM2fQ.sTHMv1Yi874Hp4H9zLRt-nFEKyovEl__dwTIc6jdLck');
        return this.transport.post('login', payload).pipe(
            pluck('token'),
        );
    }

    signup(payload: SignupRequestInterface): Observable<string> {
        console.log(payload);
        return of('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiTWljaGFlbCIsImxhc3ROYW1lIjoiWWVsaXNlaWV2Iiwicm9sZSI6IkV4cGVydCIsInRva2VuRXhwaXJhdGlvbkRhdGUiOiIyMDIwLTA3LTA5IDAwOjAwOjAwIiwiZW1haWwiOiJtaWNoYWVsZWwxNDExQGdtYWlsLmNvbSIsInBob25lIjoiKzM4MDk3NzEzNjc4NSIsImlzVmVyaWZpZWQiOmZhbHNlLCJqdGkiOiI2NjYwY2JjMy1hNzUwLTRjYjEtYTlkZi0xNzA5MGZlMGUyMDkiLCJpYXQiOjE1OTQxMzQ1NzMsImV4cCI6MTU5NDE2ODYzNn0.J9ogjnkc35pmi4Lw-DxU--GtKIzCaGLxLI-tjzIyA8Y');
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

    getQuestionnaire(id: number): Observable<QuestionnaireInterface> {
        // return of({ id: 1,
        //             title: 'Опрос 1',
        //             questions: []});
        return of({
                      id: 1,
                      title: 'Опрос 1',
                      dateStart: '2020-07-08 00:00:00',
                      questions: [
                          {
                              id: 1,
                              pointsLimit: 20,
                              content: 'Досвід роботи',
                              answers: [
                                  {
                                      id: 1,
                                      content: 'До 5 років',
                                      points: 5,
                                  },
                                  {
                                      id: 2,
                                      content: 'З 6 до 10 років',
                                      points: 10,
                                  },
                                  {
                                      id: 3,
                                      content: 'З 11 до 20 років',
                                      points: 15,
                                  },
                                  {
                                      id: 4,
                                      content: 'Більше 21 року',
                                      points: 20,
                                  },
                              ],
                          },
                          {
                              id: 2,
                              pointsLimit: 15,
                              content: 'Рівень обізнаності',
                              answers: [
                                  {
                                      id: 1,
                                      content: 'Низький',
                                      points: 5,
                                  },
                                  {
                                      id: 2,
                                      content: 'Середній',
                                      points: 10,
                                  },
                                  {
                                      id: 3,
                                      content: 'Високий',
                                      points: 15,
                                  },
                              ],
                          },
                          {
                              id: 3,
                              pointsLimit: 15,
                              content: 'Сфера діяльності',
                              answers: [
                                  {
                                      id: 1,
                                      content: 'Органи державної влади',
                                      points: 10,
                                  },
                                  {
                                      id: 2,
                                      content: 'Громадські організації',
                                      points: 10,
                                  },
                                  {
                                      id: 3,
                                      content: 'Інвестиційно консалтингові інституції',
                                      points: 10,
                                  },
                                  {
                                      id: 4,
                                      content: 'Суб\'єкти промислового бізнесу',
                                      points: 15,
                                  },
                                  {
                                      id: 5,
                                      content: 'Представники науки та освіти',
                                      points: 10,
                                  },
                              ],
                          },
                          {
                              id: 4,
                              pointsLimit: 15,
                              content: 'Термін діяльності в енергетичній та екологічній сферах',
                              answers: [
                                  {
                                      id: 1,
                                      content: 'До 10 років',
                                      points: 5,
                                  },
                                  {
                                      id: 2,
                                      content: 'З 11 до 20 років',
                                      points: 10,
                                  },
                                  {
                                      id: 3,
                                      content: 'більше 21 року',
                                      points: 15,
                                  },
                              ],
                          },
                          {
                              id: 5,
                              pointsLimit: 20,
                              content: 'Науковий рівень підготовки',
                              answers: [
                                  {
                                      id: 1,
                                      content: 'Магістр',
                                      points: 5,
                                  },
                                  {
                                      id: 2,
                                      content: 'Кандидат наук',
                                      points: 10,
                                  },
                                  {
                                      id: 3,
                                      content: 'Доктор наук',
                                      points: 15,
                                  },
                                  {
                                      id: 4,
                                      content: 'Академічне звання',
                                      points: 20,
                                  },
                              ],
                          },
                          {
                              id: 6,
                              pointsLimit: 15,
                              content: 'Посада',
                              answers: [
                                  {
                                      id: 1,
                                      content: 'Керівник середньої ланки',
                                      points: 10,
                                  },
                                  {
                                      id: 2,
                                      content: 'Керівник вищої ланки',
                                      points: 15,
                                  },
                              ],
                          },
                      ]
                  });
        return this.transport.get('questions/get', { id });
    }

    editQuestionnaire(questionnaire: QuestionnaireInterface): Observable<QuestionnaireInterface> {
        return of(questionnaire);
        return this.transport.put('questions/edit', questionnaire).pipe(
            pluck('questions'),
        );
    }

    getQuestionnaireList(token: string): Observable<QuestionnaireInterface[]> {
        return of([
                      {
                          id: 2,
                          title: 'опрос 2',
                          dateStart: '2020-07-20 00:00:00',
                      },
                      {
                          id: 3,
                          title: 'опрос 3',
                          dateStart: '2020-07-10 00:00:00',
                      },
                      {
                          id: 4,
                          title: 'опрос 4',
                          dateStart: '2020-07-05 00:00:00',
                      },
                  ]);
        return this.transport.get('questions/get/list', { token }).pipe(
            pluck('questionnaires'),
        );
    }

    passQuestionnaire(expert: ExpertInterface): Observable<any> {
        return of(null);
        return this.transport.post('questions/pass', expert);
    }

    createQuestionnaire(payload: QuestionnaireInterface): Observable<QuestionnaireInterface> {
        return of({ ...payload, id: 5 });
        return this.transport.post('questions/create', payload).pipe(
            pluck('questions'),
        );
    }

    getExpertList(): Observable<UserInterface[]> {
        return of([
                      {
                          id: 1,
                          firstName: 'Michael',
                          lastName: 'Yeliseiev',
                          phone: '+380977136785',
                          email: 'michaelel1411@gmail.com',
                          isVerified: true,
                      },
                      {
                          id: 2,
                          firstName: 'Serhii',
                          lastName: 'Lytka',
                          phone: '+380678598745',
                          email: 'lytka.serhii@gmail.com',
                          isVerified: false,
                      },
                  ]);
        return this.transport.get('expert/get/list').pipe(
            pluck('experts'),
        );
    }

    getQuestionnaireResult(id: number): Observable<QuestionnaireResultInterface> {
        return of({
                      id: 1,
                      title: 'Опрос 1',
                      dateStart: '2020-07-08 00:00:00',
                      expertsResults: [
                          {
                              id: 1,
                              expertInfo: {
                                  id: 1,
                                  firstName: 'Michael',
                                  lastName: 'Yeliseiev',
                                  phone: '+380977136785',
                                  email: 'michaelel1411@gmail.com',
                              },
                              answers: [
                                  {
                                      questionId: 1,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 2,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 3,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 4,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 5,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 6,
                                      answerId: 2,
                                  },
                              ],
                              competence: 5,
                          },
                          {
                              id: 2,
                              expertInfo: {
                                  id: 2,
                                  firstName: 'Serhii',
                                  lastName: 'Lytka',
                                  phone: '+380678598745',
                                  email: 'lytka.serhii@gmail.com',
                              },
                              answers: [
                                  {
                                      questionId: 1,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 2,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 3,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 4,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 5,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 6,
                                      answerId: 1,
                                  },
                              ],
                              competence: 4,
                          },
                      ],
                  });
        return this.transport.get('questionnaire/result/get', { id }).pipe(
            pluck('questionnaire'),
        );
    }

    getQuestionnaireExpertResult(id: number, expertId: number): Observable<QuestionnaireResultInterface> {
        return of({
                      id: 1,
                      title: 'Опрос 1',
                      dateStart: '2020-07-08 00:00:00',
                      expertsResults: [
                          {
                              id: 1,
                              expertInfo: {
                                  id: 1,
                                  firstName: 'Michael',
                                  lastName: 'Yeliseiev',
                                  phone: '+380977136785',
                                  email: 'michaelel1411@gmail.com',
                              },
                              answers: [
                                  {
                                      questionId: 1,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 2,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 3,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 4,
                                      answerId: 2,
                                  },
                                  {
                                      questionId: 5,
                                      answerId: 1,
                                  },
                                  {
                                      questionId: 6,
                                      answerId: 2,
                                  },
                              ],
                              competence: 5,
                          },
                      ],
                  });
        return this.transport.get('questionnaire/expert/result/get',  { id, expertId });
    }

    passVerificationProcess(expertId: number, isVerified: boolean): Observable<void> {
        return this.transport.put('expert/verify', { expertId, isVerified });
    }
}

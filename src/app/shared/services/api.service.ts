import { Injectable } from '@angular/core';
import { TransportService } from './transport.service';
import { Observable } from 'rxjs';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { SignupRequestInterface } from '../interfaces/signup-request.interface';
import { pluck } from 'rxjs/operators';
import { UserInterface } from '../interfaces/user.interface';
import { QuestionnaireInterface } from '../interfaces/questionnaire.interface';
import { ExpertInterface } from '../interfaces/expert.interface';
import { QuestionnaireResultInterface } from '../interfaces/questionnaire-result.interface';

@Injectable({
                providedIn: 'root',
            })
export class ApiService {

    constructor(private transport: TransportService) {
    }

    login(payload: LoginRequestInterface): Observable<string> {
        return this.transport.post('login', payload).pipe(
            pluck('token'),
        );
    }

    signup(payload: SignupRequestInterface): Observable<string> {
        return this.transport.post('signup', { ...payload });
    }

    getProfileInfo(id: number): Observable<UserInterface> {
        return this.transport.get(`profile/${id}` );
    }

    editProfileInfo(payload: UserInterface): Observable<UserInterface> {
        return this.transport.put(`profile/${payload.id}`, payload);
    }

    getQuestionnaire(id: number): Observable<QuestionnaireInterface> {
        return this.transport.get(`questionnaire/${id}`);
    }

    editQuestionnaire(questionnaire: QuestionnaireInterface): Observable<QuestionnaireInterface> {
        return this.transport.put(`questionnaire/${questionnaire.id}`, questionnaire);
    }

    getQuestionnaireList(token?: string): Observable<QuestionnaireInterface[]> {
        return this.transport.get('questionnaire');
    }

    passQuestionnaire(expert: ExpertInterface): Observable<any> {
        return this.transport.post('answers', expert);
    }

    createQuestionnaire(payload: QuestionnaireInterface): Observable<QuestionnaireInterface> {
        return this.transport.post('questionnaire', payload);
    }

    getExpertList(): Observable<UserInterface[]> {
        return this.transport.get('users', { role: 'EXPERT' });
    }

    getQuestionnaireResult(id: number): Observable<ExpertInterface[]> {
        return this.transport.get(`answers/users/${id}`);
    }

    getQuestionnaireExpertResult(id: number, expertId: number): Observable<QuestionnaireResultInterface> {
        return this.transport.get(`answers/users/${expertId}/questionnaires/${id}`);
    }

    passVerificationProcess(expertId: number, isVerified: boolean): Observable<void> {
        return this.transport.put('user/verify', { expertId, isVerified });
    }
}

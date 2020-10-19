import { ExpertAnswerInterface } from './expert-answer.interface';
import { UserInterface } from './user.interface';

export interface ExpertInterface {
    questionnaireId?: number;
    expertInfo?: UserInterface;
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    answers: ExpertAnswerInterface[];
    competence?: number;
}

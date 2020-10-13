import { ExpertAnswerInterface } from './expert-answer.interface';
import { UserInterface } from './user.interface';

export interface ExpertInterface {
    questionnaireId?: number;
    expertInfo?: UserInterface;
    answers: ExpertAnswerInterface[];
    competence?: number;
}

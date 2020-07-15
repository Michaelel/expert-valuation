import { ExpertAnswerInterface } from './expert-answer.interface';
import { UserInterface } from './user.interface';

export interface ExpertInterface {
    id: number;
    expertInfo?: UserInterface;
    answers: ExpertAnswerInterface[];
    competence?: number;
}

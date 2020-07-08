import { ExpertAnswerInterface } from './expert-answer.interface';

export interface ExpertInterface {
    id: number;
    answers: ExpertAnswerInterface[];
    competence?: number;
}

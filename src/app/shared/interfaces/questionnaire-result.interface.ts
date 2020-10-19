import { ExpertInterface } from './expert.interface';
import { QuestionInterface } from './question.interface';

export interface QuestionnaireResultInterface {
    id: number;
    title: string;
    dateStart: string;
    expertsResults: ExpertInterface[];
    questions: QuestionInterface[];
}

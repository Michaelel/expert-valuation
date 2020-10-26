import { QuestionInterface } from './question.interface';

export interface QuestionnaireInterface {
    id?: number;
    title: string;
    questions?: QuestionInterface[];
    dateStart?: string;
    dateEnd?: string;
    status?: string;
}

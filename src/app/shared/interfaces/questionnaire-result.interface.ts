import { ExpertInterface } from './expert.interface';

export interface QuestionnaireResultInterface {
    id: number;
    title: string;
    dateStart: string;
    expertsResults: ExpertInterface[];
}

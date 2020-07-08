import {AnswerInterface} from './answer.interface';

export interface QuestionInterface {
    id: number;
    content: string;
    pointsLimit: number;
    answers: AnswerInterface[];
}

import { Component, Input, OnInit } from '@angular/core';
import { QuestionInterface } from '../../interfaces/question.interface';
import { ExpertInterface } from '../../interfaces/expert.interface';

@Component({
  selector: 'app-questionnaire-pass-form',
  templateUrl: './questionnaire-pass-form.component.html',
  styleUrls: ['./questionnaire-pass-form.component.sass'],
})
export class QuestionnairePassFormComponent implements OnInit {

  @Input() questions: QuestionInterface[];
  @Input() expertAnswers: ExpertInterface;
  @Input() editable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

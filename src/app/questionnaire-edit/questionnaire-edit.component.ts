import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionInterface } from '../shared/interfaces/question.interface';
import { AnswerInterface } from '../shared/interfaces/answer.interface';
import { TableColumnsEnum } from '../shared/enums/table-columns.enum';
import { ComponentState } from '../shared/modules/component-state/component-state.enum';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { QuestionnaireInterface } from '../shared/interfaces/questionnaire.interface';
import { MomentService } from '../shared/services/moment.service';
import { DEFAULT_DATE_FORMAT } from '../../environments/constants';

@Component({
  selector: 'app-questionnaire-edit',
  templateUrl: './questionnaire-edit.component.html',
  styleUrls: ['./questionnaire-edit.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuestionnaireEditComponent implements OnInit {

  questionnaireForm = this.fb.group({
      title: ['', Validators.required],
      dateStart: ['', Validators.required],
                                    });
  state = ComponentState.Loading;

  hasChanges: boolean;

  columnsToDisplay = ['id', 'content', 'pointsLimit', 'action'];
  expandedElement: QuestionInterface | null;

  readonly tableColumnEnum = TableColumnsEnum;

  constructor(
      public dataService: QuestionnaireService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private moment: MomentService,
  ) {
    this.dataService.questionnaireId = +this.route.snapshot.paramMap.get('questionnaireId');
  }

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  handleAnswersPoints(question: QuestionInterface): void {
    question.answers = question.answers.map(answer => ({
      ...answer,
      points: answer.points > question.pointsLimit ? question.pointsLimit : answer.points,
    }));
    this.markAsDirty();
  }

  handleAnswerPoints(question: QuestionInterface, answer: AnswerInterface): void {
    answer.points = answer.points > question.pointsLimit ? question.pointsLimit : answer.points;
    this.markAsDirty();
  }

  addNewAnswer(question: QuestionInterface): void {
    question.answers.push({
      id: null,
      temporaryId: this.generateTemporaryId(),
      content: '',
      points: 0,
    });
    this.markAsDirty();
  }

  addNewQuestion(): void {
    this.dataService.questions.push({
      id: null,
      temporaryId: this.generateTemporaryId(),
      content: (this.dataService.questions.length + 1).toString(),
      pointsLimit: 0,
      answers: [],
    });
    this.dataService.questions = [ ...this.dataService.questions ];
    this.markAsDirty();
  }

  removeAnswer(question: QuestionInterface, answerToRemove: AnswerInterface): void {
    question.answers = question.answers.filter(answer => answer.temporaryId !== answerToRemove.temporaryId);
    this.markAsDirty();
  }

  removeQuestion(questionToRemove: QuestionInterface): void {
    this.dataService.questions = this.dataService.questions.filter(question => question.temporaryId !== questionToRemove.temporaryId);
    this.markAsDirty();
  }

  getQuestionnaire = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getQuestionnaire().subscribe(
        res => {
          this.state = ComponentState.Success;
          this.dataService.questionnaire = res;
          this.populateValues();
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  populateValues(): void {
      this.dataService.originQuestions = this.dataService.getQuestionnaireWithAnotherLinks(this.dataService.questionnaire.questions);
      this.dataService.questions = this.dataService.getQuestionnaireWithAnotherLinks(this.dataService.questionnaire.questions);
      this.questionnaireForm.patchValue(this.dataService.questionnaire);
      if (!this.dataService.questionnaire.dateStart) {
          this.dateStartCtrl.setValue(null);
          this.dateStartCtrl.clearValidators();
      } else {
          this.dateStartCtrl.setValue(this.moment.format(this.dataService.questionnaire.dateStart, DEFAULT_DATE_FORMAT));
      }
      this.questionnaireForm.markAsPristine();
      this.hasChanges = false;
  }

  markAsDirty(): void {
    this.hasChanges = true;
  }

  save(): void {
    this.state = ComponentState.Loading;
    this.dataService.editQuestionnaire(
        {
            ...this.questionnaireForm.value,
            dateStart: this.moment.convertFromViewToRequest(this.questionnaireForm.value.dateStart),
        },
    ).subscribe(
        res => {
          this.state = ComponentState.Success;
          this.dataService.questionnaire = res;
          this.populateValues();
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  cancel(): void {
      this.populateValues();
  }

  generateTemporaryId(): number {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  get dateStartCtrl(): AbstractControl {
      return this.questionnaireForm.get('dateStart');
  }
}

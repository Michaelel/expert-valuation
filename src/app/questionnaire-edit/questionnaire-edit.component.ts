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
})
export class QuestionnaireEditComponent implements OnInit {

  questionnaireForm = this.fb.group({
      title: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
                                    });
  state = ComponentState.Loading;

  hasChanges: boolean;

  columnsToDisplay = ['id', 'content', 'pointsLimit', 'action'];
  expandedElement: QuestionInterface | null;

  public isCreateMode: boolean;
  public questionsCount: number;

  readonly tableColumnEnum = TableColumnsEnum;

  constructor(
      public dataService: QuestionnaireService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private moment: MomentService,
  ) {
    this.dataService.questionnaireId = +this.route.snapshot.paramMap.get('questionnaireId');
    this.questionsCount = +this.route.snapshot.paramMap.get('questionsCount');
    this.isCreateMode = !!this.questionsCount;
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

  addAnswers(question: QuestionInterface): void {
    question.answers = Array.from({length: question.answersCount}, () => null);
    question.answers = question.answers.map(() => ({
      id: null,
      temporaryId: this.generateTemporaryId(),
      content: '',
      points: 0,
    }));
  }

  addNewQuestion(): void {
    this.dataService.questions.push({
      id: null,
      temporaryId: this.generateTemporaryId(),
      content: null,
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
          if (this.isCreateMode) {
            this.dataService.questionnaire.questions = Array.from({length: this.questionsCount}, () => null);
            this.dataService.questionnaire.questions = this.dataService.questionnaire.questions.map(() => ({
              id: null,
              temporaryId: this.generateTemporaryId(),
              content: '',
              pointsLimit: null,
              answers: [],
            }));
          }
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

  get dateEndCtrl(): AbstractControl {
    return this.questionnaireForm.get('dateEnd');
  }
}

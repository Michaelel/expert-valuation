import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { QuestionnaireListService } from '../../questionnaire-list.service';
import { defineState } from '../../../../environments/pure-functions';
import { Router } from '@angular/router';
import { QuestionnaireInterface } from '../../../shared/interfaces/questionnaire.interface';
import { MomentService } from '../../../shared/services/moment.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateQuestionnaireComponent } from '../../components/create-questionnaire/create-questionnaire.component';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DEFAULT_DATE_FORMAT } from '../../../../environments/constants';
import { QuestionnaireStatusEnum } from './questionnaire-status.enum';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.sass'],
})
export class QuestionnaireListComponent implements OnInit {

  state = ComponentState.Loading;

  statusEnum = QuestionnaireStatusEnum;

  displayedColumns = ['id', 'title', 'dateStart', 'dateEnd', 'action'];
  constructor(
      public dataService: QuestionnaireListService,
      private router: Router,
      private moment: MomentService,
      private dialog: MatDialog,
      public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getQuestionnaireList();
  }

  getQuestionnaireList = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getQuestionnaireList('').subscribe(
        res => {
          this.dataService.questionnaireList = res.map(questionnaire => {
            let status;
            if (this.moment.moment().isBefore(this.moment.moment(questionnaire.dateStart))) {
              status = QuestionnaireStatusEnum.Planned;
            } else if (this.moment.moment().isAfter(this.moment.moment(questionnaire.dateStart)) && this.moment.moment().isBefore(this.moment.moment(questionnaire.dateEnd))) {
              status = QuestionnaireStatusEnum.InProgress;
            } else if (this.moment.moment().isAfter(this.moment.moment(questionnaire.dateEnd))) {
              status = QuestionnaireStatusEnum.Passed;
            }
            const dateStart = this.moment.format(questionnaire.dateStart, DEFAULT_DATE_FORMAT);
            const dateEnd = this.moment.format(questionnaire.dateEnd, DEFAULT_DATE_FORMAT);
            return { ...questionnaire, dateEnd, dateStart, status };
          });
          this.state = defineState(res);
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  goToEditQuestionnaire(questionnaireId: number): void {
    this.router.navigate([`questionnaire-list/edit/${questionnaireId}`]);
  }

  deleteQuestionnaire(questionnaireId: number): void {
    this.dataService.deleteQuestionnaire(questionnaireId).subscribe(
      () => this.getQuestionnaireList(),
      e => alert(e.error.message || e.error),
    );
  }

  goToShowOrResultQuestionnaire(questionnaire: QuestionnaireInterface): void {
    this.dataService.activeQuestionnaire = questionnaire;
    this.router.navigate([`questionnaire-list/${this.isDateBeforeNow(questionnaire.dateStart) ? 'result' : 'show'}/${questionnaire.id}`]);
  }

  isDateBeforeNow(date: string): boolean {
    return this.moment.moment(this.moment.convertFromViewToRequest(date)).isBefore(this.moment.moment());
  }

  passQuestionnaire(id: number): void {
    this.router.navigate([`questionnaire-pass/${id}`]);
  }

  goToCreateQuestionnaire(): void {
    this.dialog.open(CreateQuestionnaireComponent, { width: '400px' }).afterClosed().pipe(
        filter(res => !!res),
    ).subscribe(
        res => this.router.navigate([`questionnaire-list/edit/${res.id}`, { questionsCount: res.questionsCount }]),
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { QuestionnaireListService } from '../../questionnaire-list.service';
import { defineState } from '../../../../environments/pure-functions';
import { Router } from '@angular/router';
import { QuestionnaireInterface } from '../../../shared/interfaces/questionnaire.interface';
import { MomentService } from '../../../shared/services/moment.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateQuestionnaireComponent } from '../../components/create-questionnaire/create-questionnaire.component';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.sass'],
})
export class QuestionnaireListComponent implements OnInit {

  state = ComponentState.Loading;

  displayedColumns = ['id', 'title', 'dateStart', 'action'];

  constructor(
      public dataService: QuestionnaireListService,
      private router: Router,
      private moment: MomentService,
      private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.getQuestionnaireList();
  }

  getQuestionnaireList = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getQuestionnaireList('').subscribe(
        res => {
          this.dataService.questionnaireList = res;
          this.state = defineState(res);
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  goToEditQuestionnaire(event: MouseEvent, questionnaireId: number): void {
    event.stopPropagation();
    this.router.navigate([`questionnaire-list/edit/${questionnaireId}`]);
  }

  goToShowOrResultQuestionnaire(questionnaire: QuestionnaireInterface): void {
    const openResultTab = this.moment.moment(questionnaire.dateStart).isBefore(this.moment.moment());
    this.router.navigate([`questionnaire-list/${openResultTab ? 'result' : 'show'}/${questionnaire.id}`]);
  }

  goToCreateQuestionnaire(): void {
    this.bottomSheet.open(CreateQuestionnaireComponent).afterDismissed().pipe(
        filter(res => !!res),
    ).subscribe(
        res => this.router.navigate([`questionnaire-list/edit/${res}`]),
    );
  }

}

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
import { UserService } from '../../../shared/services/user.service';

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
      public userService: UserService,
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
    this.router.navigate([`questionnaire-list/${this.isDateBeforeNow(questionnaire.dateStart) ? 'result' : 'show'}/${questionnaire.id}`]);
  }

  isDateBeforeNow(date: string): boolean {
    return this.moment.moment(date).isBefore(this.moment.moment());
  }

  passQuestionnaire(id: number): void {
    this.router.navigate([`questionnaire-pass/${id}`]);
  }

  goToCreateQuestionnaire(): void {
    this.bottomSheet.open(CreateQuestionnaireComponent).afterDismissed().pipe(
        filter(res => !!res),
    ).subscribe(
        res => this.router.navigate([`questionnaire-list/edit/${res}`]),
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { QuestionnaireListService } from '../../questionnaire-list.service';
import { QuestionnaireResultInterface } from '../../../shared/interfaces/questionnaire-result.interface';
import { ActivatedRoute } from '@angular/router';
import { defineState } from '../../../../environments/pure-functions';
import { MatDialog } from '@angular/material/dialog';
import { QuestionnaireDialogComponent } from '../../components/questionnaire-dialog/questionnaire-dialog.component';
import { ExpertInterface } from '../../../shared/interfaces/expert.interface';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.sass'],
})
export class QuestionnaireResultComponent implements OnInit {

  state = ComponentState.Loading;
  expertsState = ComponentState.Success;

  displayedColumns = ['id', 'name', 'email', 'phone'];


  questionnaireResult: ExpertInterface[];

  constructor(
      public dataService: QuestionnaireListService,
      private route: ActivatedRoute,
      private dialog: MatDialog,
      private api: ApiService,
  ) {
    this.dataService.questionnaireId = +this.route.snapshot.paramMap.get('questionnaireId');
  }

  ngOnInit(): void {
    this.dataService.activeQuestionnaire
      ? this.getQuestionnaireResult()
      : this.dataService.getQuestionnaireList().pipe(
        map(res => res.find(item => item.id === this.dataService.questionnaireId))
      ).subscribe(
        res => {
          this.dataService.activeQuestionnaire = res;
          this.getQuestionnaireResult();
        },
        e => alert(e.message || e),
      );
  }

  getQuestionnaireResult = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getQuestionnaireResult().subscribe(
        res => {
          this.state = ComponentState.Success;
          this.questionnaireResult = res;
          this.expertsState = defineState(res);
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  goExpertResult(expertId: number): void {
    this.api.getQuestionnaireExpertResult(this.dataService.questionnaireId, expertId).subscribe(
      res => this.dialog.open(
        QuestionnaireDialogComponent,
        {
          data: { expert: res },
        },
      ),
    );
  }

}

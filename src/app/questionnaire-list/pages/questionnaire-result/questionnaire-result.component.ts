import { Component, OnInit } from '@angular/core';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { QuestionnaireListService } from '../../questionnaire-list.service';
import { QuestionnaireResultInterface } from '../../../shared/interfaces/questionnaire-result.interface';
import { ActivatedRoute } from '@angular/router';
import { defineState } from '../../../../environments/pure-functions';
import { MatDialog } from '@angular/material/dialog';
import { QuestionnaireDialogComponent } from '../../components/questionnaire-dialog/questionnaire-dialog.component';
import { ExpertInterface } from '../../../shared/interfaces/expert.interface';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrls: ['./questionnaire-result.component.sass'],
})
export class QuestionnaireResultComponent implements OnInit {

  state = ComponentState.Loading;
  expertsState = ComponentState.Success;

  displayedColumns = ['id', 'name', 'email', 'phone'];


  questionnaireResult: QuestionnaireResultInterface;

  constructor(
      private dataService: QuestionnaireListService,
      private route: ActivatedRoute,
      private dialog: MatDialog,
  ) {
    this.dataService.questionnaireId = +this.route.snapshot.paramMap.get('questionnaireId');
  }

  ngOnInit(): void {
    this.getQuestionnaireResult();
  }

  getQuestionnaireResult = (): void => {
    this.state = ComponentState.Loading;
    this.dataService.getQuestionnaireResult().subscribe(
        res => {
          this.state = ComponentState.Success;
          this.questionnaireResult = res;
          this.expertsState = defineState(res.expertsResults);
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  goExpertResult(expertResult: ExpertInterface): void {
    this.dialog.open(
        QuestionnaireDialogComponent,
        {
          data: expertResult,
        },
    );
  }

}

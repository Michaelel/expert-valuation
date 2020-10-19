import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpertInterface } from '../../../shared/interfaces/expert.interface';
import { ComponentState } from '../../../shared/modules/component-state/component-state.enum';
import { defineState } from '../../../../environments/pure-functions';
import { QuestionnaireListService } from '../../questionnaire-list.service';
import { QuestionnaireService } from '../../../questionnaire-edit/questionnaire.service';
import { QuestionnairePassService } from '../../../questionnaire-pass/questionnaire-pass.service';
import { pluck } from 'rxjs/operators';
import { QuestionInterface } from '../../../shared/interfaces/question.interface';

@Component({
  selector: 'app-questionnaire-dialog',
  templateUrl: './questionnaire-dialog.component.html',
  styleUrls: ['./questionnaire-dialog.component.sass'],
})
export class QuestionnaireDialogComponent implements OnInit {

  state = ComponentState.Loading;

  constructor(
      public passService: QuestionnairePassService,
      private dialogRef: MatDialogRef<QuestionnaireDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { expert: ExpertInterface, verificationMode?: boolean, questions?: QuestionInterface[] },
  ) {
    this.passService.questionnaireId = this.data.expert.id;
  }

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  getQuestionnaire = (): void => {
    this.state = ComponentState.Loading;
    this.passService.getQuestionnaire().pipe(
        pluck('questions'),
    ).subscribe(
        res => {
          this.state = defineState(res);
          this.passService.questions = res;
        },
        e => {
          this.state = ComponentState.Error;
          alert(e);
        },
    );
  }

  finishVerification(isVerified: boolean): void {
    this.dialogRef.close({ isVerified });
  }

}

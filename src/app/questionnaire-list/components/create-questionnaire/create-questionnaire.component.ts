import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { QuestionnaireService } from '../../../questionnaire-edit/questionnaire.service';
import { QuestionnaireListService } from '../../questionnaire-list.service';
import { MomentService } from '../../../shared/services/moment.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.sass']
})
export class CreateQuestionnaireComponent implements OnInit {

  questionnaireForm = this.fb.group({
    title: ['', Validators.required],
    dateStart: ['', Validators.required],
    dateEnd: ['', Validators.required],
    questionsCount: ['', Validators.required],
  });

  constructor(
      private bottomSheetRef: MatDialogRef<CreateQuestionnaireComponent>,
      private questionnaireService: QuestionnaireListService,
      private fb: FormBuilder,
      private moment: MomentService,
  ) { }

  ngOnInit(): void {
  }

  get dateStartCtrl(): AbstractControl {
    return this.questionnaireForm.get('dateStart');
  }

  get dateEndCtrl(): AbstractControl {
    return this.questionnaireForm.get('dateEnd');
  }

  create(): void {
    this.questionnaireService.createQuestionnaire(
        {
          ...this.questionnaireForm.value,
          questions: [],
          dateStart: this.moment.convertFromViewToRequest(this.questionnaireForm.value.dateStart),
          dateEnd: this.moment.convertFromViewToRequest(this.questionnaireForm.value.dateEnd),
        },
    ).subscribe(
        res => this.bottomSheetRef.close({ id: res.id, questionsCount: this.questionnaireForm.value.questionsCount }),
        e => alert(e),
    );
  }

}

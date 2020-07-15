import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentStateModule } from '../shared/modules/component-state/component-state.module';
import { QuestionnaireListComponent } from './pages/questionnaire-list-table/questionnaire-list.component';
import { QuestionnaireRouting } from './questionnaire.routing';
import { QuestionnaireResultComponent } from './pages/questionnaire-result/questionnaire-result.component';
import { QuestionnaireShowComponent } from './pages/questionnaire-show/questionnaire-show.component';
import { CreateQuestionnaireComponent } from './components/create-questionnaire/create-questionnaire.component';
import { DateTimePickerModule } from '../shared/modules/time-picker/date-time-picker.module';
import { QuestionnaireDialogComponent } from './components/questionnaire-dialog/questionnaire-dialog.component';
import { QuestionnaireDialogModule } from './components/questionnaire-dialog/questionnaire-dialog.module';
import { QuestionnairePassFormModule } from '../shared/modules/questionnaire-pass-form/questionnaire-pass-form.module';



@NgModule({
  declarations: [QuestionnaireListComponent, QuestionnaireResultComponent, QuestionnaireShowComponent, CreateQuestionnaireComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentStateModule,
    QuestionnaireRouting,
    DateTimePickerModule,
    QuestionnaireDialogModule,
    QuestionnairePassFormModule,
  ],
  entryComponents: [ QuestionnaireDialogComponent ],
})
export class QuestionnaireModule { }

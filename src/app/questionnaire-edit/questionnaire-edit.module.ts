import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentStateModule } from '../shared/modules/component-state/component-state.module';
import { QuestionnaireEditComponent } from './questionnaire-edit.component';
import { DateTimePickerModule } from '../shared/modules/time-picker/date-time-picker.module';



@NgModule({
  declarations: [QuestionnaireEditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentStateModule,
    FormsModule,
    DateTimePickerModule,
  ],
})
export class QuestionnaireEditModule { }

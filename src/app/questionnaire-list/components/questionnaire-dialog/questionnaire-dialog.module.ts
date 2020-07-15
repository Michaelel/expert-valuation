import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireDialogComponent } from './questionnaire-dialog.component';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { ComponentStateModule } from '../../../shared/modules/component-state/component-state.module';
import { QuestionnairePassFormModule } from '../../../shared/modules/questionnaire-pass-form/questionnaire-pass-form.module';

@NgModule({
              declarations: [QuestionnaireDialogComponent],
              imports: [
                  CommonModule,
                  MaterialModule,
                  QuestionnairePassFormModule,
                  ComponentStateModule,
              ],
              exports: [QuestionnaireDialogComponent],
          })
export class QuestionnaireDialogModule {
}

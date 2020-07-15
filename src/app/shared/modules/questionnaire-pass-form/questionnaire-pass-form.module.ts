import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnairePassFormComponent } from './questionnaire-pass-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
              declarations: [QuestionnairePassFormComponent],
              imports: [
                  CommonModule,
                  MaterialModule,
                  FormsModule,
              ],
              exports: [QuestionnairePassFormComponent],
          })
export class QuestionnairePassFormModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnairePassComponent } from './questionnaire-pass.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ComponentStateModule } from '../shared/modules/component-state/component-state.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
            declarations: [QuestionnairePassComponent],
            imports: [
              CommonModule,
              MaterialModule,
              ComponentStateModule,
              ReactiveFormsModule,
              FormsModule,
            ],
            exports: [QuestionnairePassComponent],
})
export class QuestionnairePassModule { }

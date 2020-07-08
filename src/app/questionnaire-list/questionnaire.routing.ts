import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireListComponent } from './pages/questionnaire-list-table/questionnaire-list.component';
import { QuestionnaireEditComponent } from '../questionnaire-edit/questionnaire-edit.component';
import { QuestionnaireResultComponent } from './pages/questionnaire-result/questionnaire-result.component';
import { QuestionnaireShowComponent } from './pages/questionnaire-show/questionnaire-show.component';


const routes: Routes = [
  {
    path: '',
    component: QuestionnaireListComponent,
  },
  {
    path: 'result/:id',
    component: QuestionnaireResultComponent,
  },
  {
    path: 'edit/:questionnaireId',
    component: QuestionnaireEditComponent,
  },
  {
    path: 'show/:id',
    component: QuestionnaireShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireRouting { }

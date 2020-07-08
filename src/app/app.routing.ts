import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';
import { QuestionnaireEditComponent } from './questionnaire-edit/questionnaire-edit.component';
import { QuestionnairePassComponent } from './questionnaire-pass/questionnaire-pass.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'profile/:profileId',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questionnaire-edit/:questionnaireId',
    component: QuestionnaireEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questionnaire-pass/:questionnaireId',
    component: QuestionnairePassComponent,
    canActivate: [AuthGuard],
  },
  {
      path: 'questionnaire-list',
      loadChildren: () => import('./questionnaire-list/questionnaire.module').then(m => m.QuestionnaireModule),
      canActivate: [AuthGuard],
  },
];

// canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting { }

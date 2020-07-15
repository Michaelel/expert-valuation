import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpertListComponent } from './pages/expert-list/expert-list.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: ExpertListComponent,
  },
  {
    path: 'expert/:profileId',
    // loadChildren: () => import('./../profile/profile.module').then(m => m.ProfileModule),
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertRouting { }

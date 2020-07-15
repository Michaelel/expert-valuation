import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertRouting } from './expert.routing';
import { ExpertListComponent } from './pages/expert-list/expert-list.component';
import { ProfileModule } from '../profile/profile.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentStateModule } from '../shared/modules/component-state/component-state.module';


@NgModule({
  declarations: [ExpertListComponent],
  imports: [
    CommonModule,
    ExpertRouting,
    ProfileModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentStateModule,
  ],
})
export class ExpertModule { }

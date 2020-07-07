import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentStateModule } from '../shared/modules/component-state/component-state.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ComponentStateModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule { }

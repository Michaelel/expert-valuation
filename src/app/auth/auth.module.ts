import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRouting } from './auth.routing';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRouting,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule { }

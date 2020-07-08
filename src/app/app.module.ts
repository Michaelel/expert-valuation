import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { MaterialModule } from './shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './profile/profile.module';
import { HeaderModule } from './header/header.module';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { ComponentStateModule } from './shared/modules/component-state/component-state.module';
import { QuestionnaireEditModule } from './questionnaire-edit/questionnaire-edit.module';
import { QuestionnairePassModule } from './questionnaire-pass/questionnaire-pass.module';

@NgModule({
              declarations: [
                  AppComponent,
              ],
              imports: [
                  BrowserModule,
                  BrowserAnimationsModule,
                  MaterialModule,
                  AppRouting,
                  HttpClientModule,
                  ProfileModule,
                  HeaderModule,
                  FormsModule,
                  QuestionnaireEditModule,
                  ComponentStateModule,
                  QuestionnairePassModule,
              ],
              providers: [ AuthGuard ],
              bootstrap: [AppComponent],
          })
export class AppModule {
}

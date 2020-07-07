import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { MaterialModule } from './shared/modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileModule } from './profile/profile.module';
import { HeaderModule } from './header/header.module';

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
              ],
              providers: [],
              bootstrap: [AppComponent],
          })
export class AppModule {
}

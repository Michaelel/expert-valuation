import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { MaterialModule } from './shared/modules/material/material.module';
import { ChildrenOutletContexts } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
              ],
              providers: [],
              bootstrap: [AppComponent],
          })
export class AppModule {
}

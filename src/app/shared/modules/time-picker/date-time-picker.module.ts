import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimePickerComponent} from './components/time-picker/time-picker.component';
import {TimePickerCoreService} from './services/time-picker.core.service';
import {TimePickerService} from './services/time-picker.service';
import {ReactiveFormsModule} from '@angular/forms';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MaterialModule } from '../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';

const entryComponents = [TimePickerComponent, DatePickerComponent];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  declarations: [entryComponents],
  providers: [
    TimePickerService,
    TimePickerCoreService,
  ],
  entryComponents: [entryComponents],
  exports: [entryComponents],
})
export class DateTimePickerModule { }

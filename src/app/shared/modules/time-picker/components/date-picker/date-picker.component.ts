import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

import {Moment} from 'moment';
// rx
import {Observable} from 'rxjs';
// services
import {MomentService} from '../../../../services/moment.service';
import {TimePickerService} from '../../services/time-picker.service';
// interfaces
import {ITime} from '../../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DEFAULT_CALENDAR_TIME, DEFAULT_DATE_FORMAT } from '../../../../../../environments/constants';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.sass'],
    providers: [ MomentService ],
})
export class DatePickerComponent implements OnInit {
    @Input() public dateCtrl: FormControl;
    @Input() public calendarCtrl = new FormControl();
    @Input() public placeholder: string;
    @Output() public onDateSelected = new EventEmitter<string>();

    public preSelectedDate: Date;

    public constructor(
        public dialog: MatDialog,
        private fb: FormBuilder,
        public momentService: MomentService,
        private timePickerService: TimePickerService,
    ) { }

    ngOnInit(): void {
        this.dateCtrl.valueChanges.subscribe(() => {
            if (!this.dateCtrl.valid) {
                this.calendarCtrl.reset();
            }

            this.preSelectedDate =  this.momentService.moment(this.dateCtrl.value, DEFAULT_DATE_FORMAT).isValid()
            && !this.dateCtrl.hasError('pattern')
              ? this.momentService.moment(this.dateCtrl.value, DEFAULT_DATE_FORMAT).toDate()
              : new Date();
        });
    }

  changeDate(date: Moment): void {
        const selectedDate = this.momentService.moment(date).hours(DEFAULT_CALENDAR_TIME).minutes(0).format(DEFAULT_DATE_FORMAT);

        this.changeTime(selectedDate);
    }

    changeTime(date?: string): void {
        const currentTime = this.momentService.moment(date || this.dateCtrl.value, DEFAULT_DATE_FORMAT).format('HH:mm');
        this.openTimePicker(currentTime).pipe(
        ).subscribe((time: ITime) => {
            if (time) {
              const newDate = this.momentService.moment(date || this.dateCtrl.value, DEFAULT_DATE_FORMAT)
                .hours(time.hour)
                .minutes(time.minute);

              const formattedDate = newDate.format(DEFAULT_DATE_FORMAT);

              this.dateCtrl.setValue(formattedDate);
              this.onDateSelected.emit(formattedDate);
              this.dateCtrl.markAsDirty();
            } else {
              this.calendarCtrl.reset();
            }
        });
    }

    openTimePicker(time: string): Observable<ITime | null> {
        return this.timePickerService.open({
            theme: 'material-green',
            changeToMinutes: true,
            animation: 'fade',
            time,
        }).afterClose();
    }


    get dateInputPlaceholder(): string {
        return this.placeholder || 'Выберите дату';
    }
}

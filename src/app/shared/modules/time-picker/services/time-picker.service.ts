import {Injectable} from '@angular/core';
import {TimePickerComponent} from '../components/time-picker/time-picker.component';
import {IDialogResult, ITime, TimePickerConfig} from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable()
export class TimePickerService {
  constructor (
    private dialog: MatDialog,
  ) {}

  open(config?: TimePickerConfig): IDialogResult {

    const thems = ['light', 'dark', 'material-red', 'material-green', 'material-blue', 'material-purple', 'material-orange'];
    const _self = this;
    config = config || {};
    config = {
      animation: config.animation,
      time: config.time || '00:00',
      theme: thems.indexOf(config.theme) > 0 ? config.theme : 'light' || config.theme || 'light',
      rangeTime: config.rangeTime || {start: '0:0', end: '24:0'},
      arrowStyle: config.arrowStyle || {},
      locale: config.locale || 'en',
      changeToMinutes: config.changeToMinutes || false,
      preference: config.preference || null,
      onlyHour: config.onlyHour || false,
      onlyMinute: config.onlyMinute || false,
      onlyAM: config.onlyAM || false,
      onlyPM: config.onlyPM || false,
    } as TimePickerConfig;
    config.rangeTime = {
      start: config.rangeTime.start || '0:0',
      end: config.rangeTime.end || '24:0',
    };
    config.arrowStyle = {
      background: (config.arrowStyle.background) ?
      config.arrowStyle.background : config.theme !== undefined ?
      config.theme === 'dark' ? 'rgb(128, 203, 196)' : '' : '',
      color: config.arrowStyle.color || '',
    };
    const timer = this.dialog.open(TimePickerComponent, {
      data: { config },
      disableClose: false,
      panelClass: 'time-picker-dialog-content',
    })

    return {
      afterClose(): Observable<ITime> {
        return timer.afterClosed();
      },
    };
  }
}

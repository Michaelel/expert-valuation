import {Component, Inject, OnInit} from '@angular/core';
import { IClockNumber, IDisplayPreference, ITime, TimePickerConfig } from '../../interfaces';
import { TimePickerCoreService } from '../../services/time-picker.core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})

export class TimePickerComponent implements OnInit {
  public activeModal = true;
  // public timerElement: any;
  public clockObject: Array<any>;
  public isClicked: boolean;
  public clockType: 'minute' | 'hour' = 'hour';
  public time: ITime = {
    minute: 0,
    hour: 24,
  };
  public nowTime: any = this.time.hour;
  public degree: any;
  public config: TimePickerConfig;
  public isPopup = true;
  public allowed: any;
  public preference: IDisplayPreference;
  public changeToMin: boolean;

  private animationTime = 0;

  constructor(
    private core: TimePickerCoreService,
    public dialogRef: MatDialogRef<TimePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.config = this.data.config;
  }

  ngOnInit(): void {
    this.allowed = this.core.allowedTimes(this.config.rangeTime.start, this.config.rangeTime.end);
    if (this.config && this.config.onlyMinute) {
      this.clockType = 'minute';
    }
    if (this.config && this.config.onlyPM) {
      this.time.ampm = 'PM';
    }
    this.clockMaker();

    if (this.config.time) {
      this.time.hour = +this.config.time.substr(0, 2);
      this.time.minute = +this.config.time.substr(3, 2);
    }
  }


  public MinuteClick(): void {
    /**
     * We are not permitting user to select the minute.
     * but anyway, it will return the standard time, if provided the default time.
     */
    if (this.config && this.config.onlyHour) { return; }

    this.changeAnimation('minute');
  }

  public HourClick(): void {
    /**
     * We are not permitting user to select the minute.
     * but anyway, it will return the standard time, if provided the default time.
     */
    if (this.config && this.config.onlyMinute) { return; }

    this.changeAnimation('hour');
  }

  changeAnimation(type: 'minute' | 'hour'): void {
    if (this.clockType !== type) {
      this.clockType = type;

      if (this.config.animation === 'fade') {
        this.changeToMin = true;
        setTimeout(() => {
          this.changeToMin = false;
          this.clockMaker();
        }, 200);
      } else if (this.config.animation === 'rotate') {
        this.animationTime = 0.4;
        this.clockMaker();
      } else {
        this.clockMaker();
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this.dialogRef.close(this.time);
  }

  public ParseStringToTime (time: string): void {
    time = (time === '' || time === undefined || time === null) ? this.time.hour + ':' + this.time.minute : time;

    this.time = this.core.StringToTime(time);
  }

  clockMaker = () => {
    const type = this.clockType;
    this.clockObject = this.core.ClockMaker(type);
    this.setArrow(null);
  }

  setActiveTime = () => {
    this.nowTime = (this.clockType === 'minute' ? this.time.minute : this.time.hour);
  }

  setArrow = (obj: any) => {
    if (obj) {
      this.clockType = obj.type;
      if (this.clockType === 'minute') {
        this.time.minute = obj.time;
      } else {
        this.time.hour = obj.time;
      }
    }
    const step = (this.clockType === 'minute') ? 6 : 30;
    const time = (this.clockType === 'minute') ? this.time.minute : this.time.hour;
    const degrees = time * step;
    this.rotationClass(degrees);
    this.setActiveTime();
  }

  rotationClass = (degrees: any) => {
    this.degree = degrees;
  }

  setTime(): void {
    this.isClicked = false;
    if (this.config.changeToMinutes && this.clockType === 'hour') {
      this.changeAnimation('minute');
    }
  }

  getDegree = (ele: any) => {
    const step = this.clockType === 'minute' ? 6 : 30;
    const parrentPos = ele.currentTarget.getBoundingClientRect();
    if (this.isClicked && (ele.currentTarget === ele.target || ele.target.nodeName === 'BUTTON')) {
      const clock = {
        width: ele.currentTarget.offsetWidth,
        height: ele.currentTarget.offsetHeight,
      };
      let degrees = this.core.CalcDegrees(ele, parrentPos, step);
      const radius = this.core.calcRadius(ele, parrentPos, step);
      let hour = this.time.hour,
          minute = this.time.minute;

      if (this.clockType === 'hour') {
        if(radius > 83){
          hour = (degrees / step);
          hour = (hour > 12) ? hour - 12 : hour;
        } else {
          if(degrees >= 270 && degrees <=360){
            degrees += 360
          }
          hour = (degrees / step)
          hour = (hour > 23 ? hour - 24 : hour)
        }
      } else if (this.clockType === 'minute') {
        minute = (degrees / step);
        minute = (minute > 59) ? minute - 60 : minute;
      }

      const min = this.config.rangeTime.start,
            max = this.config.rangeTime.end;

      const nowMinHour =  +min.split(':')[0];
      const nowMaxHour =  +max.split(':')[0];
      const nowMinMin = +min.split(':')[1];
      const nowMaxMin = +max.split(':')[1];

      const nowTime = this.GetNowTime(hour, this.time.ampm, minute);

      if (this.allowed.indexOf(nowTime) > -1) {
        this.time.hour = hour;
        this.time.minute = minute;
        this.rotationClass(degrees);
        this.setActiveTime();
      } else if (this.clockType === 'hour' && (hour === nowMinHour && minute <= nowMinMin)) {
        this.time.hour = nowMinHour;
        this.time.minute = nowMinMin;
      } else if (this.clockType === 'hour' && (hour === nowMaxHour && minute >= nowMaxMin)) {
        this.time.hour = nowMaxHour;
        this.time.minute = nowMaxMin;
      }
    }
  }

  private GetNowTime (hour: number, ampm: 'AM' | 'PM', minute: number): string {

    const Hour = (hour === 24) ? '0' : hour;
    const nowTime = Hour + ':' + minute;
    return nowTime;
  }

  checkBet(): void {
    const nowTime = this.GetNowTime(this.time.hour, this.time.ampm, this.time.minute);
    if (this.allowed.indexOf(nowTime) === -1) {
      this.ParseStringToTime(this.config.rangeTime.start);
      this.setArrow(null);
      this.setActiveTime();
    }
  }


  public GetSeparator () {
    if (this.preference && this.preference.separator) {
      return this.preference.separator;
    }
    return ':';
  }
  public GetPeriod (period: 'AM' | 'PM') {
    if (this.preference && this.preference.period) {
      return this.preference.period(period);
    }
    return period;
  }
  public GetMinute () {
    if (this.preference && this.preference.minute) {
      return this.preference.minute(this.time.minute);
    }
    let min: string = this.time.minute.toString();
    if (+min < 10) {
      min = '0' + min;
    }
    return min;
  }
  public GetHour () {
    if (this.preference && this.preference.hour) {
      return this.preference.hour(this.time.hour);
    }
    return (this.time.hour < 10) ? "0" + this.time.hour : this.time.hour;
  }
  public GetClockTime(clock: IClockNumber) {
    if ( ! this.preference) {
      return clock.time;
    }
    if ( this.clockType === 'hour' && this.preference.clockHour) {
      return this.preference.clockHour(clock.time);
    }
    if ( this.clockType === 'minute' && this.preference.clockMinute) {
      return this.preference.clockMinute(clock.time);
    }
    return clock.time;
  }

  public GetLabel(key: string): string {
    const defaults = {
      'ok': 'Ок',
      'cancel': 'Отмена',
    };
    if ((this.preference && this.preference.labels && this.preference.labels.ok)) {
      defaults.ok = this.preference.labels.ok;
    }
    if ((this.preference && this.preference.labels && this.preference.labels.cancel)) {
      defaults.cancel = this.preference.labels.cancel;
    }
    return defaults[key];
  }


  // SetAM () {
  //   if (this.config && this.config.onlyPM) {
  //     return false;
  //   }
  //   this.time.ampm = 'AM';
  //   this.checkBet();
  // }
  //
  // SetPM () {
  //   if (this.config && this.config.onlyAM) {
  //     return false;
  //   }
  //   this.time.ampm = 'PM';
  //   this.checkBet();
  // }

  // modalAnimation(): void {
  //   setTimeout(() => {
  //     this.activeModal = true;
  //   }, 1);
  // }
}

import {Injectable} from '@angular/core';
// moment
import * as moment from 'moment';
import {Duration, Moment} from 'moment';
import DurationConstructor = moment.unitOfTime.DurationConstructor;

export { Moment } from 'moment';

@Injectable({ providedIn: 'root' })
export class MomentService {
  public constructor() {
    moment.locale('ru-UA');
  }

  public moment(date?: Date | string | number | Moment, format?: string): Moment {
    return moment(date, format);
  }

  public now(): Moment {
    return moment(Date.now());
  }

  public roundTo(date: Moment, round: number): Moment {
    const INTERVALS = Math.ceil(date.minutes() / round);
    const HOUR_INTERVALS = 11;

    (INTERVALS > HOUR_INTERVALS) ?
        date.add(1, 'hours').minutes(0) :
        date.minutes(INTERVALS * round);

    return date;
  }

  public format(date?: Date | string | number | Moment, format?: string): string {
    return moment(date).isValid() ? moment(date).format(format) : '';
  }

  public isValid(date: string | Moment | Date, format?: string): boolean {
    return moment(date, format).isValid();
  }

  public convertFromViewToRequest(time: string, format: string = 'DD.MM.YYYY HH:mm'): string {
    return this.moment(time, format).isValid()
        ? this.moment(time, format).format('YYYY-MM-DD HH:mm:ss')
        : null;
  }

  public convert(time: string): string {
    const originTimeValue: Date = new Date(time);
    let adaptedTimeValue = '';
    adaptedTimeValue += this.pad(originTimeValue.getFullYear());
    adaptedTimeValue += '-';
    adaptedTimeValue += this.pad(originTimeValue.getMonth() + 1);
    adaptedTimeValue += '-';
    adaptedTimeValue += this.pad(originTimeValue.getDate());
    adaptedTimeValue += ' ';
    adaptedTimeValue += this.pad(originTimeValue.getHours());
    adaptedTimeValue += ':';
    adaptedTimeValue += this.pad(originTimeValue.getMinutes());
    adaptedTimeValue += ':';
    adaptedTimeValue += this.pad(originTimeValue.getSeconds());
    return adaptedTimeValue;
  }

  unixDifference(dateStart: Moment | string | Date, dateEnd: Moment | string | Date): number {
    return moment(dateEnd).unix() - moment(dateStart).unix();
  }

  duration(time: number, unit: DurationConstructor = 'milliseconds'): Duration {
    return moment.duration(time, unit);
  }

  isAfter(dateStart: Date | string | Moment, dateEnd: Date | string| Moment): boolean {
    return moment(dateStart).isAfter(moment(dateEnd));
  }

  get weekDays(): string[] {
    return moment.weekdaysShort();
  }

  get weekDaysTitles(): string[] {
    return moment.weekdays();
  }

  get months(): string[] {
    return moment.months();
  }

  /**
   * Converts 2 to 02, 5 to 05, 11 to 11 etc.
   * @param {number} d
   * @returns {string}
   */
  private pad(d: number): string {
    const CONVERSION_LIMIT = 10; // minimal number which does not have to be converted
    return (d < CONVERSION_LIMIT) ? '0' + d.toString() : d.toString();
  }
}

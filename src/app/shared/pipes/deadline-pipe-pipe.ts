import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadlinePipe',
  standalone: true,
})
export class DeadlinePipePipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (value == null || value === '') {
      return 'Pas d’échéance';
    }

    const deadline = this.getDayNumber(value);
    const todayDate = new Date();
    const today = this.getDayNumber(todayDate);
    const difference = deadline - today;

    if (difference === 0) {
      return 'Aujourd’hui';
    }
    if (difference === 1) {
      return 'Demain';
    }
    if (difference > 1) {
      return `Dans ${difference} jours`;
    }

    const overdueDays = Math.abs(difference);
    return `En retard de ${overdueDays} ${overdueDays === 1 ? 'jour' : 'jours'}`;
  }

  private getDayNumber(value: string | Date): number {
    let year: number;
    let month: number;
    let day: number;

    if (value instanceof Date) {
      year = value.getFullYear();
      month = value.getMonth() + 1;
      day = value.getDate();
    } else {
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      if (!match) {
        throw new RangeError(`Invalid deadline date: ${value}`);
      }

      year = Number(match[1]);
      month = Number(match[2]);
      day = Number(match[3]);
    }

    const date = new Date(year, month - 1, day);
    if (
      Number.isNaN(date.getTime()) ||
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      throw new RangeError(`Invalid deadline date: ${value}`);
    }

    return Date.UTC(year, month - 1, day) / 86_400_000;
  }
}

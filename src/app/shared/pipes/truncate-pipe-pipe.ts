import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe',
  standalone: true,
})
export class TruncatePipePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 50, suffix = '...'): string {
    if (value == null) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    return `${value.slice(0, Math.max(0, limit)).trimEnd()}${suffix}`;
  }
}

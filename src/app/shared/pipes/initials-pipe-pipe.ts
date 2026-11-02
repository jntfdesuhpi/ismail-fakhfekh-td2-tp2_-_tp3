import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialsPipe',
  standalone: true,
})
export class InitialsPipePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value?.trim()) {
      return '?';
    }

    return value
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0].toLocaleUpperCase())
      .join('');
  }
}

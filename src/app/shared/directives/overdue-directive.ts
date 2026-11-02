import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOverdue]',
  standalone: true,
})
export class OverdueDirective {
  @Input() dueDate?: string;
  @Input() done = false;

  @HostBinding('class')
  get overdueClasses(): string {
    return this.isOverdue ? 'border-red-500 bg-red-50' : '';
  }

  private get isOverdue(): boolean {
    if (this.done || !this.dueDate || !/^\d{4}-\d{2}-\d{2}$/.test(this.dueDate)) {
      return false;
    }

    const [year, month, day] = this.dueDate.split('-').map(Number);
    const due = new Date(year, month - 1, day);
    if (due.getFullYear() !== year || due.getMonth() !== month - 1 || due.getDate() !== day) {
      return false;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return due < today;
  }
}

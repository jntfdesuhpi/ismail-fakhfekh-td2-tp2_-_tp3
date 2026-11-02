import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { projectsData } from '../../project/feature/data/projects.data';
import { Task } from '../../project/feature/models/task';
import { OverdueDirective } from './overdue-directive';

@Component({
  imports: [OverdueDirective],
  template: `
    @for (task of tasks; track task.id) {
      <div
        [attr.data-task-id]="task.id"
        appOverdue
        [dueDate]="task.dueDate"
        [done]="task.status === 'Terminé'"
      ></div>
    }
    <div id="invalid-date" appOverdue dueDate="2026-02-30"></div>
  `,
})
class TestHost {
  readonly tasks: Task[] = projectsData.flatMap((project) => project.tasks);
}

describe('OverdueDirective', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 10));

    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('marks only tasks 3 and 8 as overdue for October 10, 2026', () => {
    const markedIds = Array.from(
      fixture.nativeElement.querySelectorAll('[data-task-id]') as NodeListOf<HTMLElement>,
    )
      .filter((element) => element.classList.contains('border-red-500') &&
        element.classList.contains('bg-red-50'))
      .map((element) => Number(element.dataset['taskId']));

    expect(markedIds).toEqual([3, 8]);
  });

  it('does not add classes for a missing date, a completed task, or an invalid date', () => {
    const taskWithoutDate = fixture.nativeElement.querySelector('[data-task-id="9"]') as HTMLElement;
    const completedTask = fixture.nativeElement.querySelector('[data-task-id="1"]') as HTMLElement;
    const invalidDate = fixture.nativeElement.querySelector('#invalid-date') as HTMLElement;

    for (const element of [taskWithoutDate, completedTask, invalidDate]) {
      expect(element.classList.contains('border-red-500')).toBe(false);
      expect(element.classList.contains('bg-red-50')).toBe(false);
    }
  });
});

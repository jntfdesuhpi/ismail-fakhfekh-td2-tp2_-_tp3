import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../core/services/user.service';
import { Task, TaskPriority } from '../../models/task';
import { DatePipe, KeyValuePipe, SlicePipe } from '@angular/common';
import { DeadlinePipePipe } from '../../../../shared/pipes/deadline-pipe-pipe';
import { TruncatePipePipe } from '../../../../shared/pipes/truncate-pipe-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight-directive';
import { OverdueDirective } from '../../../../shared/directives/overdue-directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip-directive';

@Component({
  imports: [
    DatePipe,
    DeadlinePipePipe,
    HighlightDirective,
    KeyValuePipe,
    OverdueDirective,
    SlicePipe,
    TooltipDirective,
    TruncatePipePipe,
  ],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);

  private readonly userService = inject(UserService);
  protected readonly users = toSignal(this.userService.getUsers(), { initialValue: [] });

  protected readonly taskCountsByPriority = computed(() => {
    const counts: Record<TaskPriority, number> = { Basse: 0, Haute: 0, Moyenne: 0 };
    for (const task of this.tasks()) {
      counts[task.priority]++;
    }
    return counts;
  });

  getUserName(assigneeId?: number): string {
    if (!assigneeId) return 'Non assignée';
    const user = this.users().find((u) => u.id === assigneeId);
    return user ? user.name : 'Non assignée';
  }
}

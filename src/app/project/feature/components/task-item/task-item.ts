import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';
import { HighlightDirective } from '../../../../shared/directives/highlight-directive';
import { OverdueDirective } from '../../../../shared/directives/overdue-directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip-directive';
import { TruncatePipePipe } from '../../../../shared/pipes/truncate-pipe-pipe';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
import { DeadlinePipePipe } from '../../../../shared/pipes/deadline-pipe-pipe';
import { Task, TaskStatus } from '../../models/task';
import { User } from '../../../../user/feature/models/user';

@Component({
  imports: [
    DatePipe,
    NgClass,
    NgStyle,
    HighlightDirective,
    OverdueDirective,
    TooltipDirective,
    TruncatePipePipe,
    InitialsPipePipe,
    DeadlinePipePipe,
  ],
  selector: 'app-task-item',
  styleUrl: './task-item.css',
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input<boolean>(true);
  users = input<User[]>([]);
  taskStatusChange = output<TaskStatus>();

  private readonly userService = inject(UserService, { optional: true });
  private readonly defaultUsers = toSignal(this.userService?.getUsers() ?? of([]), {
    initialValue: [],
  });

  changeTaskStatus(): void {
    const currentStatus = this.task().status;
    let nextStatus: TaskStatus;

    switch (currentStatus) {
      case 'En attente':
        nextStatus = 'En cours';
        break;
      case 'En cours':
        nextStatus = 'Terminé';
        break;
      case 'Terminé':
        nextStatus = 'En attente';
        break;
      default:
        nextStatus = 'En attente';
    }

    this.taskStatusChange.emit(nextStatus);
  }

  getUserName(assigneeId?: number): string {
    if (!assigneeId) return 'Non assignée';
    const usersList = this.users().length > 0 ? this.users() : this.defaultUsers();
    const user = usersList.find((u) => u.id === assigneeId);
    return user ? user.name : 'Non assignée';
  }
}

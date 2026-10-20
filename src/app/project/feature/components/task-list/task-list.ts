import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../core/services/user.service';
import { Task } from '../../models/task';

@Component({
  imports: [],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);

  private readonly userService = inject(UserService);
  protected readonly users = toSignal(this.userService.getUsers(), { initialValue: [] });

  getUserName(assigneeId?: number): string {
    if (!assigneeId) return 'Non assignée';
    const user = this.users().find((u) => u.id === assigneeId);
    return user ? user.name : 'Non assignée';
  }
}

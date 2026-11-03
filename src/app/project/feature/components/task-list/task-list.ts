import { SlicePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Task, TaskStatus } from '../../models/task';
import { TaskItem } from '../task-item/task-item';
import { User } from '../../../../user/feature/models/user';

@Component({
  imports: [SlicePipe, TaskItem],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);
  projectId = input<number>();
  users = input<User[]>([]);

  taskStatusChange = output<{ taskId: number; newStatus: TaskStatus; projectId?: number }>();

  onTaskStatusChange(taskId: number, newStatus: TaskStatus): void {
    this.taskStatusChange.emit({
      taskId,
      newStatus,
      projectId: this.projectId(),
    });
  }
}

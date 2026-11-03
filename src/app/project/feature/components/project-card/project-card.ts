import { Component, computed, input, output } from '@angular/core';
import { Project } from '../../models/project';
import { TaskList } from '../task-list/task-list';
import { CurrencyPipe, DecimalPipe, NgStyle, PercentPipe, registerLocaleData, SlicePipe, UpperCasePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HighlightDirective } from '../../../../shared/directives/highlight-directive';
import { TaskStatus } from '../../models/task';
import { User } from '../../../../user/feature/models/user';

registerLocaleData(localeFr, 'fr');

@Component({
  imports: [TaskList, CurrencyPipe, DecimalPipe, HighlightDirective, NgStyle, PercentPipe, SlicePipe, UpperCasePipe],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  users = input<User[]>([]);
  projectSelected = output<Project>();
  taskStatusChange = output<{ projectId: number; taskId: number; newStatus: TaskStatus }>();

  readonly completedTasksCount = computed(() => {
    return this.project().tasks.filter((task) => task.status === 'Terminé').length;
  });

  readonly totalTasksCount = computed(() => {
    return this.project().tasks.length;
  });

  readonly completionRate = computed(() => {
    const totalTasks = this.totalTasksCount();
    return totalTasks > 0 ? this.completedTasksCount() / totalTasks : 0;
  });

  readonly averageCostPerTask = computed(() => {
    const totalTasks = this.totalTasksCount();
    return totalTasks > 0 ? this.project().budget / totalTasks : 0;
  });

  selectProject(): void {
    this.projectSelected.emit(this.project());
  }

  onTaskStatusChange(event: { taskId: number; newStatus: TaskStatus; projectId?: number }): void {
    this.taskStatusChange.emit({
      projectId: event.projectId ?? this.project().id,
      taskId: event.taskId,
      newStatus: event.newStatus,
    });
  }
}

import { Component, computed, input } from '@angular/core';
import { Project } from '../../../../project/feature/models/project';
import { Task } from '../../../../project/feature/models/task';
import { TaskList } from '../../../../project/feature/components/task-list/task-list';
import { User } from '../../models/user';

export interface ProjectGroupItem {
  id: number;
  name: string;
  tasks: Task[];
}

@Component({
  imports: [TaskList],
  selector: 'app-user-project-group',
  templateUrl: './user-project-group.html',
  styleUrl: './user-project-group.css',
})
export class UserProjectGroup {
  // Single project inputs
  project = input<Project>();
  projectName = input<string>();
  tasks = input<Task[]>();

  // Multi-project grouping inputs
  projects = input<Project[]>();
  user = input<User>();
  userId = input<number>();

  protected readonly projectGroups = computed<ProjectGroupItem[]>(() => {
    // If single project/projectName and tasks are provided
    const directTasks = this.tasks();
    const proj = this.project();
    const name = this.projectName() ?? proj?.name;
    if (name && directTasks) {
      return [
        {
          id: proj?.id ?? 0,
          name,
          tasks: directTasks,
        },
      ];
    }

    // If projects list and userId/user are provided
    const allProjects = this.projects();
    const targetUserId = this.userId() ?? this.user()?.id;
    if (allProjects && targetUserId !== undefined) {
      return allProjects
        .map((p) => ({
          id: p.id,
          name: p.name,
          tasks: p.tasks.filter((t) => t.assigneeId === targetUserId),
        }))
        .filter((g) => g.tasks.length > 0);
    }

    // If only projects list provided and tasks are already user-specific
    if (allProjects) {
      return allProjects
        .filter((p) => p.tasks && p.tasks.length > 0)
        .map((p) => ({
          id: p.id,
          name: p.name,
          tasks: p.tasks,
        }));
    }

    return [];
  });
}

import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { User } from '../../models/user';
import { Project } from '../../../../project/feature/models/project';
import { UserProjectGroup } from '../user-project-group/user-project-group';

@Component({
  imports: [NgClass, UserProjectGroup],
  selector: 'app-user-card',
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  projects = input<Project[]>([]);

  protected readonly userProjects = computed(() => {
    const userId = this.user().id;
    return this.projects()
      .map((project) => ({
        project,
        tasks: project.tasks.filter((task) => task.assigneeId === userId),
      }))
      .filter((group) => group.tasks.length > 0);
  });

  protected readonly allUserTasks = computed(() =>
    this.userProjects().flatMap((g) => g.tasks),
  );

  protected readonly pendingCount = computed(
    () => this.allUserTasks().filter((t) => t.status === 'En attente').length,
  );

  protected readonly inProgressCount = computed(
    () => this.allUserTasks().filter((t) => t.status === 'En cours').length,
  );

  protected readonly doneCount = computed(
    () => this.allUserTasks().filter((t) => t.status === 'Terminé').length,
  );
}

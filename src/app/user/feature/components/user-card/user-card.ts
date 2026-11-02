import { Component, computed, input } from '@angular/core';
import { LowerCasePipe, NgClass, TitleCasePipe } from '@angular/common';
import { User } from '../../models/user';
import { Project } from '../../../../project/feature/models/project';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { InitialsPipePipe } from '../../../../shared/pipes/initials-pipe-pipe';
import { HighlightDirective } from '../../../../shared/directives/highlight-directive';

@Component({
  imports: [HighlightDirective, InitialsPipePipe, LowerCasePipe, NgClass, TitleCasePipe, UserProjectGroup],
  selector: 'app-user-card',
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input.required<User>();
  projects = input<Project[]>([]);

  protected readonly roleBorderClass = computed(() => {
    switch (this.user().role) {
      case 'Développeur':
        return 'border-blue-500';
      case 'Designer':
        return 'border-yellow-500';
      case 'Chef de projet':
        return 'border-orange-500';
      case 'Testeur':
        return 'border-green-500';
      default:
        return 'border-red-500';
    }
  });

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

import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../../models/project';
import { ProjectServiceTs } from '../../../../core/services/project.service';
import { UserService } from '../../../../core/services/user.service';
import { ProjectView, ViewToggle } from '../../../../shared/components/view-toggle/view-toggle';
import { UserList } from '../../../../user/feature/components/user-list/user-list';
import { User } from '../../../../user/feature/models/user';
import { TaskStatus } from '../../models/task';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  imports: [FormsModule, ProjectCard, ViewToggle, UserList, EmptyState],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  protected readonly projects = signal<Project[]>([]);
  protected readonly users = signal<User[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly view = signal<ProjectView>('task');
  private readonly projectService = inject(ProjectServiceTs);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
    });

    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  protected readonly filteredProjects = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return this.projects().filter((project) =>
      project.name.toLowerCase().includes(searchTerm),
    );
  });

  onProjectSelected(project: Project): void {
    console.log(project);
  }

  onViewChange(view: ProjectView): void {
    this.view.set(view);
  }

  onTaskStatusChange(event: { projectId: number; taskId: number; newStatus: TaskStatus }): void {
    this.projects.update((projects) =>
      projects.map((project) => {
        if (project.id !== event.projectId) {
          return project;
        }

        return {
          ...project,
          tasks: project.tasks.map((task) => {
            if (task.id !== event.taskId) {
              return task;
            }

            return {
              ...task,
              status: event.newStatus,
            };
          }),
        };
      }),
    );
  }
}

import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../../models/project';
import { ProjectServiceTs } from '../../../../core/services/project.service';
import { ProjectView, ViewToggle } from '../../../../shared/components/view-toggle/view-toggle';
import { UserList } from '../../../../user/feature/components/user-list/user-list';

import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  imports: [FormsModule, ProjectCard, ViewToggle, UserList, EmptyState],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {   // Not crucial. Angular calls your ngOnInit() method if it exists, with or without implements OnInit. is only a TypeScript safety check.
  protected readonly projects = signal<Project[]>([]);   // starts empty
  protected readonly searchTerm = signal('');
  protected readonly view = signal<ProjectView>('task');
  private readonly projectService = inject(ProjectServiceTs);

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects.set(projects);
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
}

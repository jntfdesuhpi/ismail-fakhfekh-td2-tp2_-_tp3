import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { projectsData } from '../../data/projects.data';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../../models/project';

@Component({
  imports: [FormsModule, ProjectCard],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  protected readonly projects = signal<Project[]>(projectsData);
  protected readonly searchTerm = signal('');
  protected readonly filteredProjects = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return this.projects().filter((project) =>
      project.name.toLowerCase().includes(searchTerm),
    );
  });

  onProjectSelected(project: Project): void {
    console.log(project);
  }
}

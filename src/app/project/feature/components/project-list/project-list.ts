import { Component } from '@angular/core';
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
  protected readonly projects: Project[] = projectsData;
  protected searchTerm = '';

  protected get filteredProjects(): Project[] {
    const searchTerm = this.searchTerm.trim().toLowerCase();

    return this.projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm),
    );
  }

  onProjectSelected(project: Project): void {
    console.log(project);
  }
}

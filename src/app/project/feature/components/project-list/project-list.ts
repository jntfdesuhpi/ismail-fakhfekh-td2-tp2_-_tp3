import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { projectsData } from '../../data/projects.data';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../../models/project';
import { ProjectServiceTs } from '../../../../core/services/project.service';

@Component({
  imports: [FormsModule, ProjectCard],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  protected readonly projects = signal<Project[]>([]);   // starts empty
  protected readonly searchTerm = signal('');
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
}

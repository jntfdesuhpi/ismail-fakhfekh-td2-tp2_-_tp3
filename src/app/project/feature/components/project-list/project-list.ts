import { Component } from '@angular/core';
import { projectsData } from '../../data/projects.data';
import { ProjectCard } from '../project-card/project-card';
import { Project } from '../../models/project';

@Component({
  imports: [ProjectCard],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  protected readonly projects: Project[] = projectsData;

  onProjectSelected(project: Project): void {
    console.log(project);
  }
}

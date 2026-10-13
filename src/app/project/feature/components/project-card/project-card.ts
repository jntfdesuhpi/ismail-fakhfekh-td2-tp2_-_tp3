import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project';
import { TaskList } from '../task-list/task-list';

@Component({
  imports: [TaskList],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
  projectSelected = output<Project>();

  selectProject(): void {
    // if u wanted simple logic u can just do 
    // console.log('Project selected:', this.project());

    // output<Project>() creates a “channel” named projectSelected that can carry a Project
    // and here we are emitting the current project through that channel
    this.projectSelected.emit(this.project());
  }
}

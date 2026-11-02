import { Component, input, output } from '@angular/core';
import { Project } from '../../models/project';
import { TaskList } from '../task-list/task-list';
import { CurrencyPipe, DecimalPipe, PercentPipe, registerLocaleData, SlicePipe, UpperCasePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HighlightDirective } from '../../../../shared/directives/highlight-directive';

registerLocaleData(localeFr, 'fr');

@Component({
  imports: [TaskList, CurrencyPipe, DecimalPipe, HighlightDirective, PercentPipe, SlicePipe, UpperCasePipe],
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

  completionRate(): number {
    const totalTasks = this.project().tasks.length;
    const completedTasks = this.project().tasks.filter((task) => task.status === 'Terminé').length;
    return totalTasks > 0 ? completedTasks / totalTasks : 0;
  }

  averageCostPerTask(): number {
    const totalTasks = this.project().tasks.length;
    return totalTasks > 0 ? this.project().budget / totalTasks : 0;
  }
}

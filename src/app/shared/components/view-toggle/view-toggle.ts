import { Component, input, output } from '@angular/core';

export type ProjectView = 'task' | 'user';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  selectedView = input.required<ProjectView>();
  viewChange = output<ProjectView>();
}

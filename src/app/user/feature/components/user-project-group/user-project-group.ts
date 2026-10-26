import { Component, input } from '@angular/core';
import { Project } from '../../../../project/feature/models/project';
import { Task } from '../../../../project/feature/models/task';
import { TaskList } from '../../../../project/feature/components/task-list/task-list';

@Component({
  imports: [TaskList],
  selector: 'app-user-project-group',
  templateUrl: './user-project-group.html',
})

export class UserProjectGroup {
  readonly project = input.required<Project>();
  readonly tasks = input.required<Task[]>();
}

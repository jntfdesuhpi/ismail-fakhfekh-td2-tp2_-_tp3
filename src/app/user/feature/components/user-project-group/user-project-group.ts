import { Component, signal, input, inject } from '@angular/core';
import { Project } from '../../../../project/feature/models/project';
import { UserCard } from '../user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-user-project-group',
  templateUrl: './user-project-group.html',
})

export class UserProjectGroup {
  readonly usersPerProject = input.required<Project>();
}

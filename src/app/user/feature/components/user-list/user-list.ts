import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ProjectServiceTs } from '../../../../core/services/project.service';
import { UserCard } from '../user-card/user-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { User } from '../../models/user';
import { Project } from '../../../../project/feature/models/project';

@Component({
  imports: [FormsModule, UserCard, EmptyState],
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  projects = input<Project[]>();

  protected readonly users = signal<User[]>([]);
  protected readonly serviceProjects = signal<Project[]>([]);
  protected readonly searchTerm = signal('');

  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectServiceTs);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users.set(users);
    });

    this.projectService.getProjects().subscribe((projects) => {
      this.serviceProjects.set(projects);
    });
  }

  protected readonly currentProjects = computed(() => {
    const fromInput = this.projects();
    return fromInput !== undefined ? fromInput : this.serviceProjects();
  });

  protected readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.users();
    }
    return this.users().filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term),
    );
  });
}

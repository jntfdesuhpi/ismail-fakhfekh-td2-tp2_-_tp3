import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProjectGroup } from './user-project-group';
import { Project } from '../../../../project/feature/models/project';

describe('UserProjectGroup', () => {
  let component: UserProjectGroup;
  let fixture: ComponentFixture<UserProjectGroup>;

  const mockProject: Project = {
    id: 1,
    name: 'Refonte du site web',
    description: 'Description test',
    status: 'En cours',
    tasks: [
      { id: 1, title: 'Maquette UI', priority: 'Haute', status: 'Terminé', assigneeId: 1 },
      { id: 2, title: 'Integration CSS', priority: 'Moyenne', status: 'En cours', assigneeId: 1 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProjectGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProjectGroup);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project name and task count when project and tasks are provided', async () => {
    fixture.componentRef.setInput('project', mockProject);
    fixture.componentRef.setInput('tasks', mockProject.tasks);
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Refonte du site web');
    expect(content).toContain('2 tâches');
    expect(content).toContain('Maquette UI');
    expect(content).toContain('Integration CSS');
  });

  it('should hide assignee name in task-list when showAssignee is false', async () => {
    fixture.componentRef.setInput('project', mockProject);
    fixture.componentRef.setInput('tasks', mockProject.tasks);
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).not.toContain('Assignée à :');
  });

  it('should group projects by userId when projects array and userId are provided', async () => {
    const multiProjects: Project[] = [
      mockProject,
      {
        id: 2,
        name: 'Projet Deux',
        description: 'Autre projet',
        status: 'En attente',
        tasks: [
          { id: 3, title: 'Tâche User 1', priority: 'Basse', status: 'En attente', assigneeId: 1 },
          { id: 4, title: 'Tâche User 2', priority: 'Haute', status: 'En cours', assigneeId: 2 },
        ],
      },
    ];

    fixture.componentRef.setInput('projects', multiProjects);
    fixture.componentRef.setInput('userId', 1);
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Refonte du site web');
    expect(content).toContain('Projet Deux');
    expect(content).toContain('Tâche User 1');
    expect(content).not.toContain('Tâche User 2');
  });
});

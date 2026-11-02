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
    startDate: '2026-09-01',
    budget: 12000,
    status: 'En cours',
    tasks: [
      { id: 1, title: 'Maquette UI', description: 'Maquette', priority: 'Haute', status: 'Terminé', assigneeId: 1 },
      { id: 2, title: 'Integration CSS', description: 'Integration', priority: 'Moyenne', status: 'En cours', assigneeId: 1 },
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

  it('should display the singular task count for one task', async () => {
    fixture.componentRef.setInput('project', mockProject);
    fixture.componentRef.setInput('tasks', mockProject.tasks.slice(0, 1));
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Refonte du site web');
    expect(content).toContain('1 tâche');
    expect(content).toContain('Maquette UI');
  });
});

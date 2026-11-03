import { ComponentFixture, TestBed } from '@angular/core/testing';
import { projectsData } from '../../data/projects.data';
import { ProjectCard } from './project-card';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', projectsData[0]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project details and pass its tasks to the task list', () => {
    const content = fixture.nativeElement.textContent.replace(/\s+/g, ' ');

    expect(content).toContain('REFONTE DU SITE WEB');
    expect(content).toContain('Nouvelle identité visuelle et nouvelle navigation.');
    expect(content).toContain('En cours');
    expect(content).toContain('Maquettes de l’accueil');
    expect(content).toContain('Haute');
    expect(content).toContain('12 000,00 TND');
    expect(content).toContain('40 %');
    expect(content).toContain('2 400');
  });

  it('should emit the project when the select button is clicked', () => {
    const selectedProjects: unknown[] = [];
    component.projectSelected.subscribe((project) => selectedProjects.push(project));

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(selectedProjects).toEqual([projectsData[0]]);
  });

  it('should display the appropriate progress message', async () => {
    expect(fixture.nativeElement.textContent).toContain('En progression');

    fixture.componentRef.setInput('project', projectsData[3]);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Aucune tâche pour le moment');

    fixture.componentRef.setInput('project', {
      ...projectsData[0],
      tasks: projectsData[0].tasks.map((task) => ({ ...task, status: 'Terminé' as const })),
    });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Projet terminé');

    fixture.componentRef.setInput('project', {
      ...projectsData[0],
      tasks: projectsData[0].tasks.map((task) => ({ ...task, status: 'En attente' as const })),
    });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Pas encore démarré');
  });

  it('should compute and display the completed tasks count', () => {
    expect(component.completedTasksCount()).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('2 / 5');
  });

  it('should forward taskStatusChange with projectId, taskId, and newStatus to parent', () => {
    const emittedEvents: unknown[] = [];
    component.taskStatusChange.subscribe((event) => emittedEvents.push(event));

    component.onTaskStatusChange({ taskId: 3, newStatus: 'Terminé' });

    expect(emittedEvents).toEqual([
      {
        projectId: projectsData[0].id,
        taskId: 3,
        newStatus: 'Terminé',
      },
    ]);
  });
});

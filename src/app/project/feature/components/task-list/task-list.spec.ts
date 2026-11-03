import { ComponentFixture, TestBed } from '@angular/core/testing';
import { projectsData } from '../../data/projects.data';
import { TaskList } from './task-list';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    fixture.componentRef.setInput('tasks', projectsData[0].tasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first three task titles and priorities', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Maquettes de l’accueil');
    expect(content).toContain('Échéance : 10/09/2026');
    expect(content).toContain('Haute');
    expect(content).toContain('Terminé');
    expect(content).toContain('Intégration du header');
    expect(content).toContain('Moyenne');
    expect(content).toContain('Formulaire de contact');
    expect(content).not.toContain('Tests responsive');
    expect(content).toContain('Assignée à : Amira Ben Salah');
  });

  it('should display tasks without a due date without throwing', async () => {
    fixture.componentRef.setInput('tasks', [projectsData[1].tasks[3]]);
    await fixture.whenStable();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Notifications push');
    expect(content).toContain('Échéance : Pas d’échéance');
  });

  it('should display a description only when one exists', async () => {
    const task = projectsData[0].tasks[1];
    fixture.componentRef.setInput('tasks', [task]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Créer les maquettes');
  });

  it('should hide the assignee when showAssignee is false', async () => {
    fixture.componentRef.setInput('tasks', [projectsData[0].tasks[0]]);
    fixture.componentRef.setInput('showAssignee', false);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Assignée à :');
    expect(fixture.nativeElement.textContent).not.toContain('Amira Ben Salah');
  });

  it('should display an empty-state message when there are no tasks', async () => {
    fixture.componentRef.setInput('tasks', []);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent.trim()).toBe('Aucune tâche');
  });

  it('should transmit taskStatusChange with task id and new status to parent', async () => {
    fixture.componentRef.setInput('projectId', 1);
    await fixture.whenStable();

    const emittedEvents: Array<{ taskId: number; newStatus: string; projectId?: number }> = [];
    component.taskStatusChange.subscribe((event) => emittedEvents.push(event));

    // First task in projectsData[0] is task 1 with status 'Terminé' -> clicking cycles to 'En attente'
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emittedEvents.length).toBe(1);
    expect(emittedEvents[0]).toEqual({
      taskId: 1,
      newStatus: 'En attente',
      projectId: 1,
    });
  });
});

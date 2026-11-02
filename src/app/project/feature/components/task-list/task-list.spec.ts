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
    expect(content).toContain('Intégration du header');
    expect(content).toContain('Moyenne');
    expect(content).toContain('Formulaire de contact');
    expect(content).toContain('Amira Ben Salah');
  });

  it('should display tasks without a due date without throwing', async () => {
    fixture.componentRef.setInput('tasks', [projectsData[1].tasks[3]]);
    await fixture.whenStable();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Notifications push');
    expect(content).toContain('Échéance : Pas d’échéance');
  });

  it('should display the complete short description of task 5', async () => {
    const task = projectsData[0].tasks[4];
    fixture.componentRef.setInput('tasks', [task]);
    await fixture.whenStable();

    const description = fixture.nativeElement.querySelector('li p:nth-child(2)').textContent.trim();

    expect(description).toBe('Tester l’affichage sur mobile et tablette.');
    expect(description).not.toContain('...');
  });

  it('should truncate longer task descriptions', async () => {
    fixture.componentRef.setInput('tasks', [projectsData[0].tasks[0]]);
    await fixture.whenStable();

    const description = fixture.nativeElement.querySelector('li p:nth-child(2)').textContent.trim();

    expect(description).toContain('...');
    expect(description.length).toBeLessThan(projectsData[0].tasks[0].description!.length);
  });

  it('should display the full description in a tooltip on mouseenter and remove it on mouseleave', async () => {
    const task = projectsData[0].tasks[0];
    fixture.componentRef.setInput('tasks', [task]);
    await fixture.whenStable();

    const descElement: HTMLElement = fixture.nativeElement.querySelector('li p:nth-child(2)');
    expect(descElement.querySelector('span')).toBeNull();

    descElement.dispatchEvent(new Event('mouseenter'));
    const tooltipSpan = descElement.querySelector('span');
    expect(tooltipSpan).not.toBeNull();
    expect(tooltipSpan?.textContent).toBe(task.description);

    descElement.dispatchEvent(new Event('mouseleave'));
    expect(descElement.querySelector('span')).toBeNull();
  });

  it('should display task counts for every priority', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Basse : 1');
    expect(content).toContain('Haute : 2');
    expect(content).toContain('Moyenne : 2');
  });

  it('should display zero counts for priorities without tasks', async () => {
    fixture.componentRef.setInput('tasks', []);
    await fixture.whenStable();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Basse : 0');
    expect(content).toContain('Haute : 0');
    expect(content).toContain('Moyenne : 0');
  });

  it('should display a symbol for each task priority', async () => {
    const tasks = projectsData[0].tasks.slice(0, 3);
    fixture.componentRef.setInput('tasks', [
      { ...tasks[0], priority: 'Haute' },
      { ...tasks[1], priority: 'Moyenne' },
      { ...tasks[2], priority: 'Basse' },
    ]);
    await fixture.whenStable();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('▲ Haute');
    expect(content).toContain('● Moyenne');
    expect(content).toContain('▼ Basse');
  });
});

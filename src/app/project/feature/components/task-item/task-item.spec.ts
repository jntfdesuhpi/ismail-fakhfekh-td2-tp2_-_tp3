import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../../models/task';
import { TaskItem } from './task-item';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;
  const task: Task = {
    id: 1,
    title: 'Maquettes de l’accueil',
    description: 'Préparer les maquettes.',
    priority: 'Haute',
    status: 'En cours',
    dueDate: '2026-09-10',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', task);
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the requested task details', () => {
    const content = fixture.nativeElement.textContent;
    const priority = fixture.nativeElement.querySelector('.bg-red-100');
    const status = fixture.nativeElement.querySelector('.bg-blue-100');

    expect(content).toContain('Maquettes de l’accueil');
    expect(content).toContain('Préparer les maquettes.');
    expect(content).toContain('Haute');
    expect(content).toContain('En cours');
    expect(content).toContain('10/09/2026');
    expect(priority).not.toBeNull();
    expect(status).not.toBeNull();
  });

  it('should omit the description when it is absent', async () => {
    fixture.componentRef.setInput('task', { ...task, description: undefined });
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).not.toContain('Préparer les maquettes.');
  });

  it('should not mark a completed task as overdue', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 10));
    fixture.componentRef.setInput('task', { ...task, dueDate: '2026-09-10', status: 'Terminé' });
    fixture.detectChanges();

    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    expect(article.classList.contains('border-red-500')).toBe(false);
    expect(article.classList.contains('bg-red-50')).toBe(false);
  });

  it('should mark an overdue task and style its status and priority', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 10));
    fixture.componentRef.setInput('task', { ...task, dueDate: '2026-09-10' });
    fixture.detectChanges();

    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    expect(article.classList.contains('border-red-500')).toBe(true);
    expect(article.classList.contains('bg-red-50')).toBe(true);
    expect(article.classList.contains('border-l-blue-500')).toBe(true);
  });

  it('should cycle task status correctly and emit taskStatusChange on button click', async () => {
    const emittedStatuses: string[] = [];
    component.taskStatusChange.subscribe((newStatus) => emittedStatuses.push(newStatus));

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    // Currently status is 'En cours' -> next should be 'Terminé'
    button.click();
    expect(emittedStatuses).toEqual(['Terminé']);

    // Set status to 'Terminé' -> next should be 'En attente'
    fixture.componentRef.setInput('task', { ...task, status: 'Terminé' });
    await fixture.whenStable();
    button.click();
    expect(emittedStatuses).toEqual(['Terminé', 'En attente']);

    // Set status to 'En attente' -> next should be 'En cours'
    fixture.componentRef.setInput('task', { ...task, status: 'En attente' });
    await fixture.whenStable();
    button.click();
    expect(emittedStatuses).toEqual(['Terminé', 'En attente', 'En cours']);
  });

  it('should apply ngClass dynamically based on task status', async () => {
    const article: HTMLElement = fixture.nativeElement.querySelector('article');

    // Status: En cours
    expect(article.classList.contains('border-l-blue-500')).toBe(true);

    // Status: En attente
    fixture.componentRef.setInput('task', { ...task, status: 'En attente' });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(article.classList.contains('border-l-amber-500')).toBe(true);

    // Status: Terminé
    fixture.componentRef.setInput('task', { ...task, status: 'Terminé' });
    await fixture.whenStable();
    fixture.detectChanges();
    expect(article.classList.contains('border-l-emerald-500')).toBe(true);
  });

  it('should truncate long descriptions using TruncatePipe and show tooltip with TooltipDirective', async () => {
    const longDesc = 'A'.repeat(80);
    fixture.componentRef.setInput('task', { ...task, description: longDesc });
    await fixture.whenStable();
    fixture.detectChanges();

    const p: HTMLElement = fixture.nativeElement.querySelector('p.text-sm');
    expect(p.textContent).toContain('...');
    expect(p.textContent!.length).toBeLessThan(longDesc.length);

    // Test TooltipDirective on mouseenter/mouseleave
    p.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    const tooltip = p.querySelector('span[role="tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.textContent).toBe(longDesc);

    p.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(p.querySelector('span[role="tooltip"]')).toBeNull();
  });

  it('should test HighlightDirective on the article element', () => {
    const article: HTMLElement = fixture.nativeElement.querySelector('article');
    article.dispatchEvent(new Event('mouseenter'));
    expect(article.style.backgroundColor).toBe('rgb(254, 249, 195)');

    article.dispatchEvent(new Event('mouseleave'));
    expect(article.style.backgroundColor).toBe('');
  });

  it('should display assignee initials using InitialsPipe and handle unassigned tasks', async () => {
    fixture.componentRef.setInput('task', { ...task, assigneeId: undefined });
    fixture.componentRef.setInput('showAssignee', true);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Assignée à : Non assignée');
    expect(fixture.nativeElement.textContent).toContain('NA');
  });
});

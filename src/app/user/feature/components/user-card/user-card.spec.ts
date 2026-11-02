import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCard } from './user-card';
import { User } from '../../models/user';
import { Project } from '../../../../project/feature/models/project';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  const activeUser: User = {
    id: 1,
    name: 'Amira Ben Salah',
    email: 'amira@taskflow.tn',
    role: 'Développeur',
    active: true,
  };

  const inactiveUser: User = {
    id: 4,
    name: 'Karim Jaziri',
    email: 'karim@taskflow.tn',
    role: 'Testeur',
    active: false,
  };

  const mockProjects: Project[] = [
    {
      id: 1,
      name: 'Refonte du site web',
      description: 'Test description',
      startDate: '2026-09-01',
      budget: 12000,
      status: 'En cours',
      tasks: [
        { id: 1, title: 'Task 1', description: 'Task one', priority: 'Haute', status: 'Terminé', assigneeId: 1 },
        { id: 2, title: 'Task 2', description: 'Task two', priority: 'Moyenne', status: 'En cours', assigneeId: 1 },
        { id: 3, title: 'Task 3', description: 'Task three', priority: 'Basse', status: 'En attente', assigneeId: 1 },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user information and Actif badge for active user', async () => {
    fixture.componentRef.setInput('user', activeUser);
    fixture.componentRef.setInput('projects', mockProjects);
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Amira Ben Salah');
    expect(content).toContain('amira@taskflow.tn');
    expect(content).toContain('Développeur');
    expect(content).toContain('Actif');
    expect(fixture.nativeElement.querySelector('.rounded-full.bg-blue-100').textContent.trim()).toBe('AB');
  });

  it('should display Inactif badge for inactive user', async () => {
    fixture.componentRef.setInput('user', inactiveUser);
    fixture.componentRef.setInput('projects', mockProjects);
    await fixture.whenStable();
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('[data-testid="status-badge"]');
    expect(badge.textContent).toContain('Inactif');
    expect(badge.classList).toContain('bg-rose-100');
  });

  it('should display three counters: À faire, En cours, Terminées', async () => {
    fixture.componentRef.setInput('user', activeUser);
    fixture.componentRef.setInput('projects', mockProjects);
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('À faire');
    expect(content).toContain('En cours');
    expect(content).toContain('Terminées');

    expect(content).toContain('1'); // 1 En attente, 1 En cours, 1 Terminé
  });

  it('should display "Aucune tâche assignée" when user has no assigned tasks', async () => {
    fixture.componentRef.setInput('user', inactiveUser); // id: 4, has no tasks in mockProjects
    fixture.componentRef.setInput('projects', mockProjects);
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Aucune tâche assignée');
  });
});

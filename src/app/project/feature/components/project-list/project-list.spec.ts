import { ComponentFixture, TestBed } from '@angular/core/testing';
import { projectsData } from '../../data/projects.data';
import { ProjectList } from './project-list';

describe('ProjectList', () => {
  let component: ProjectList;
  let fixture: ComponentFixture<ProjectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project cards from the project data', () => {
    expect(fixture.nativeElement.textContent).toContain('Refonte du site web');
    expect(fixture.nativeElement.textContent).toContain('Application mobile');
    expect(fixture.nativeElement.textContent).toContain('Migration base de données');
  });

  it('should filter project cards by name as the search term changes', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'application mobile';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Application mobile');
    expect(content).not.toContain('Refonte du site web');
    expect(content).not.toContain('Migration base de données');
  });

  it('should handle a selected project', () => {
    const log = vi.spyOn(console, 'log');
    const button: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('app-project-card button');

    expect(button).not.toBeNull();
    button?.click();

    expect(log).toHaveBeenCalledWith(projectsData[0]);
  });

  it('should show projects grouped by assignee when the user view is selected', () => {
    const button: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('app-view-toggle button:nth-child(2)');

    expect(button).not.toBeNull();
    button?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Amira Ben Salah');
    expect(fixture.nativeElement.textContent).toContain('Maquettes de l’accueil');
  });
});

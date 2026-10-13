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
    expect(fixture.nativeElement.textContent).toContain('Projet 1');
    expect(fixture.nativeElement.textContent).toContain('Projet 2');
    expect(fixture.nativeElement.textContent).toContain('Projet 3');
  });

  it('should filter project cards by name as the search term changes', async () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    input.value = 'projet 2';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Projet 2');
    expect(content).not.toContain('Projet 1');
    expect(content).not.toContain('Projet 3');
  });

  it('should handle a selected project', () => {
    const log = vi.spyOn(console, 'log');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();

    expect(log).toHaveBeenCalledWith(projectsData[0]);
  });
});

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
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Projet 1');
    expect(content).toContain('Description du projet 1');
    expect(content).toContain('En cours');
    expect(content).toContain('Tâche 1');
    expect(content).toContain('Haute');
  });

  it('should emit the project when the select button is clicked', () => {
    const selectedProjects: unknown[] = [];
    component.projectSelected.subscribe((project) => selectedProjects.push(project));

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(selectedProjects).toEqual([projectsData[0]]);
  });
});

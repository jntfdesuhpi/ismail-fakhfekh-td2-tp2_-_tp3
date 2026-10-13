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

  it('should display each task title and priority', () => {
    const content = fixture.nativeElement.textContent;

    expect(content).toContain('Tâche 1');
    expect(content).toContain('Haute');
    expect(content).toContain('Tâche 2');
    expect(content).toContain('Moyenne');
  });
});

import { TestBed } from '@angular/core/testing';
import { ProjectServiceTs } from './project.service.ts';

describe('ProjectServiceTs', () => {
  let service: ProjectServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

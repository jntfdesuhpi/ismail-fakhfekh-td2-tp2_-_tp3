import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserList } from './user-list';
import { UserService } from '../../../../core/services/user.service';
import { ProjectServiceTs } from '../../../../core/services/project.service';
import { of } from 'rxjs';
import { usersData } from '../../data/users.data';
import { projectsData } from '../../../../project/feature/data/projects.data';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: () => of(usersData),
            getUserById: (id: number) => of(usersData.find((u) => u.id === id)),
          },
        },
        {
          provide: ProjectServiceTs,
          useValue: {
            getProjects: () => of(projectsData),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of users from UserService', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Amira Ben Salah');
    expect(content).toContain('Mohamed Ali');
    expect(content).toContain('Sarra Trabelsi');
  });

  it('should filter users based on search term', async () => {
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('#user-search');
    expect(searchInput).not.toBeNull();

    searchInput.value = 'Mohamed';
    searchInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Mohamed Ali');
    expect(content).not.toContain('Amira Ben Salah');
    expect(content).not.toContain('Sarra Trabelsi');
  });

  it('should display EmptyState when no user matches search', async () => {
    const searchInput: HTMLInputElement = fixture.nativeElement.querySelector('#user-search');
    expect(searchInput).not.toBeNull();

    searchInput.value = 'InexistantXYZ';
    searchInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('app-empty-state');
    expect(emptyState).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('aucun element trouve');
  });
});

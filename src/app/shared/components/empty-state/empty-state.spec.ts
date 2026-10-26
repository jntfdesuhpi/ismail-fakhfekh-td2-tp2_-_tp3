import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  let component: EmptyState;
  let fixture: ComponentFixture<EmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyState);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default message when none provided', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('aucun element trouve');
  });

  it('should display the custom message input', async () => {
    fixture.componentRef.setInput('message', 'Aucun utilisateur ne correspond à votre recherche.');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Aucun utilisateur ne correspond à votre recherche.');
  });
});

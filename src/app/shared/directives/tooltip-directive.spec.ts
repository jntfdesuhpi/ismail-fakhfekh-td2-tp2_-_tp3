import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipDirective } from './tooltip-directive';

@Component({
  imports: [TooltipDirective],
  template: `
    <p id="target" [appTooltip]="tooltipText">Texte court</p>
    <p id="static-target" appTooltip="Description statique">Texte statique</p>
    <p id="empty-target" appTooltip="">Texte sans infobulle</p>
  `,
})
class TestHost {
  tooltipText = 'Description complète';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new TooltipDirective();
    expect(directive).toBeTruthy();
  });

  it('creates a tooltip span on mouseenter and removes it on mouseleave', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#target');

    expect(element.querySelector('span')).toBeNull();

    element.dispatchEvent(new Event('mouseenter'));
    const tooltipSpan = element.querySelector('span');
    expect(tooltipSpan).not.toBeNull();
    expect(tooltipSpan?.textContent).toBe('Description complète');

    element.dispatchEvent(new Event('mouseleave'));
    expect(element.querySelector('span')).toBeNull();
  });

  it('works with a static tooltip string', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#static-target');

    element.dispatchEvent(new Event('mouseenter'));
    const tooltipSpan = element.querySelector('span');
    expect(tooltipSpan).not.toBeNull();
    expect(tooltipSpan?.textContent).toBe('Description statique');

    element.dispatchEvent(new Event('mouseleave'));
    expect(element.querySelector('span')).toBeNull();
  });

  it('does not create multiple tooltip spans on repeated mouseenter', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#target');

    element.dispatchEvent(new Event('mouseenter'));
    element.dispatchEvent(new Event('mouseenter'));

    const spans = element.querySelectorAll('span');
    expect(spans.length).toBe(1);

    element.dispatchEvent(new Event('mouseleave'));
    expect(element.querySelector('span')).toBeNull();
  });

  it('does not create a tooltip span when tooltip text is empty', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#empty-target');

    element.dispatchEvent(new Event('mouseenter'));
    expect(element.querySelector('span')).toBeNull();
  });

  it('cleans up the tooltip if destroyed while hovering', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#target');

    element.dispatchEvent(new Event('mouseenter'));
    expect(element.querySelector('span')).not.toBeNull();

    fixture.destroy();
    expect(element.querySelector('span')).toBeNull();
  });
});

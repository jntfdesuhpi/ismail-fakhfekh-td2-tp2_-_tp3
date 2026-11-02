import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight-directive';

@Component({
  imports: [HighlightDirective],
  template: `
    <div id="default" appHighlight></div>
    <div id="custom" appHighlight="#e0f2fe" style="background-color: rgb(255, 0, 0)"></div>
  `,
})
class TestHost {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
  });

  it('uses the default hover color and restores the original background', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#default');

    element.dispatchEvent(new Event('mouseenter'));
    expect(element.style.backgroundColor).toBe('rgb(254, 249, 195)');

    element.dispatchEvent(new Event('mouseleave'));
    expect(element.style.backgroundColor).toBe('');
  });

  it('uses a custom hover color and restores an existing background', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('#custom');

    element.dispatchEvent(new Event('mouseenter'));
    expect(element.style.backgroundColor).toBe('rgb(224, 242, 254)');

    element.dispatchEvent(new Event('mouseleave'));
    expect(element.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });
});

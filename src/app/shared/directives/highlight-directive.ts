import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private color = '#fef9c3';

  @Input('appHighlight')
  set highlightColor(color: string | null | undefined) {
    this.color = color || '#fef9c3';
  }

  private readonly originalBackgroundColor: string;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {
    this.originalBackgroundColor = elementRef.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.color,
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.originalBackgroundColor) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.originalBackgroundColor);
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'background-color');
    }
  }
}

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') appTooltip = '';

  get text(): string {
    return this.appTooltip;
  }
  set text(value: string) {
    this.appTooltip = value ?? '';
  }

  private tooltipElement: HTMLElement | null = null;

  constructor(
    private readonly elementRef?: ElementRef<HTMLElement>,
    private readonly renderer?: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.appTooltip || this.tooltipElement || !this.renderer || !this.elementRef) {
      return;
    }

    this.tooltipElement = this.renderer.createElement('span');
    const textNode = this.renderer.createText(this.appTooltip);
    this.renderer.appendChild(this.tooltipElement, textNode);

    this.renderer.setAttribute(this.tooltipElement, 'role', 'tooltip');

    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.addClass(this.tooltipElement, 'absolute');
    this.renderer.addClass(this.tooltipElement, 'left-0');
    this.renderer.addClass(this.tooltipElement, 'top-full');
    this.renderer.addClass(this.tooltipElement, 'z-50');
    this.renderer.addClass(this.tooltipElement, 'mt-1');
    this.renderer.addClass(this.tooltipElement, 'max-w-xs');
    this.renderer.addClass(this.tooltipElement, 'rounded-md');
    this.renderer.addClass(this.tooltipElement, 'bg-slate-900');
    this.renderer.addClass(this.tooltipElement, 'px-2.5');
    this.renderer.addClass(this.tooltipElement, 'py-1.5');
    this.renderer.addClass(this.tooltipElement, 'text-xs');
    this.renderer.addClass(this.tooltipElement, 'text-white');
    this.renderer.addClass(this.tooltipElement, 'shadow-lg');
    this.renderer.addClass(this.tooltipElement, 'pointer-events-none');
    this.renderer.addClass(this.tooltipElement, 'whitespace-normal');

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'left', '0');
    this.renderer.setStyle(this.tooltipElement, 'top', '100%');
    this.renderer.setStyle(this.tooltipElement, 'zIndex', '50');

    this.renderer.appendChild(this.elementRef.nativeElement, this.tooltipElement);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private removeTooltip(): void {
    if (this.tooltipElement && this.renderer && this.elementRef) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}

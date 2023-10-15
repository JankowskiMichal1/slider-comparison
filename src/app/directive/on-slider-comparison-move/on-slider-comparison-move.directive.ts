import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { ComparisonService } from 'src/app/services/comparison.service';

@Directive({ selector: '[libOnSliderComparisonMove]' })
export class OnSliderComparisonMoveDirective implements AfterViewInit {
  private _isDragging: boolean = false;
  @Input() plane: string = 'horizontal';

  ngAfterViewInit(): void {
    const box: HTMLElement = document.querySelector('.box')!;
    const secondSlot: HTMLElement = document.querySelector('.second-slot')!;
    const handlerContainer: HTMLElement =
      document.querySelector('.handler-container')!;
    const handler: HTMLElement = document.querySelector('.handler')!;
    const secondContainer: HTMLElement =
      document.querySelector('.second-container')!;

    const boxWidth: string = `${box.offsetWidth}px`;
    const boxHeight: string = `${box.offsetHeight}px`;
    this._renderer.setStyle(secondSlot, 'width', boxWidth);
    this._renderer.setStyle(secondSlot, 'height', boxHeight);

    this.addClass(
      handlerContainer,
      'handler-container-vertical',
      'handler-container-horizontal'
    );
    this.addClass(handler, 'handler-vertical', 'handler-horizontal');
    this.addClass(
      secondContainer,
      'second-container-vertical',
      'second-container-horizontal'
    );
  }

  constructor(
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2,
    private _comparisonService: ComparisonService
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const handler: HTMLElement | null =
      this._el.nativeElement.querySelector('.handler');

    this._isDragging = this._comparisonService.isMouseOnElement(event, handler);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (!this._isDragging) {
      return;
    }

    const element: HTMLElement | null = this._el.nativeElement;
    const handler: HTMLElement | null =
      element.querySelector('.handler-container');
    const imgContainer: HTMLElement | null =
      element.querySelector('.second-container');
    const result: number | null = this._comparisonService.calcComparisonResult(
      this.plane,
      event,
      element,
      handler
    );

    if (!result) {
      return;
    }

    if (this.plane === 'horizontal') {
      this._renderer.setStyle(imgContainer, 'width', `${result}%`);
      this._renderer.setStyle(handler, 'left', `${result}%`);
      return;
    }

    if (this.plane === 'vertical') {
      this._renderer.setStyle(imgContainer, 'height', `${result}%`);
      this._renderer.setStyle(handler, 'top', `${result}%`);
      return;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this._isDragging = false;
  }

  addClass(
    element: Element | ChildNode,
    verticalClass: string,
    horizontalClass: string
  ): void {
    if (this.plane === 'vertical') {
      this._renderer.addClass(element, `${verticalClass}`);
    } else {
      this._renderer.addClass(element, `${horizontalClass}`);
    }
  }
}

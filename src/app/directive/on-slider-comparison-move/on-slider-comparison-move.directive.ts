import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({ selector: '[libOnSliderComparisonMove]' })
export class OnSliderComparisonMoveDirective implements AfterViewInit {
  private _isDragging: boolean = false;
  @Input() plane: string = 'horizontal';

  ngAfterViewInit(): void {
    const box: HTMLElement = document.querySelector('.box')!;
    const secondSlot: HTMLElement = document.querySelector('.second-slot')!;
    const handlerContainer: HTMLElement = document.querySelector('.handler-container')!;
    const handler: HTMLElement = document.querySelector('.handler')!;
    const secondContainer: HTMLElement = document.querySelector('.second-container')!


    const boxWidth = `${box.offsetWidth}px`
    const boxHeight = `${box.offsetHeight}px`
    this._renderer.setStyle(secondSlot, 'width', boxWidth)
    this._renderer.setStyle(secondSlot, 'height', boxHeight)

    this.addClass(handlerContainer, 'handler-container-vertical', 'handler-container-horizontal')
    this.addClass(handler, 'handler-vertical', 'handler-horizontal')
    this.addClass(secondContainer, 'second-container-vertical', 'second-container-horizontal')
  }

  constructor(
    private _el: ElementRef<HTMLElement>,
    private _renderer: Renderer2
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const handler: HTMLElement | null =
      this._el.nativeElement.querySelector('.handler');
    const mousePositionX = event.clientX;
    const mousePositionY = event.clientY;
    const handlerRect = handler?.getBoundingClientRect();
    if (
      handlerRect &&
      mousePositionX >= handlerRect.left &&
      mousePositionX <= handlerRect.right &&
      mousePositionY <= handlerRect.bottom &&
      mousePositionY >= handlerRect.top
    ) {
      this._isDragging = true;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    if (this._isDragging) {
      const mousePosition = this.plane === 'vertical' ? event.clientY : event.clientX;
      const elementX = this.plane === 'vertical' ? this._el.nativeElement.offsetTop : this._el.nativeElement.offsetLeft;
      const elementPlane = this.plane === 'vertical' ? this._el.nativeElement.offsetHeight : this._el.nativeElement.offsetWidth;

      const result = ((mousePosition - elementX) / elementPlane) * 100;

      const handler: HTMLElement | null =
        this._el.nativeElement.querySelector('.handler-container');
      const imgContainer: HTMLElement | null =
        this._el.nativeElement.querySelector('.second-container');

      const handlerRect: DOMRect | undefined = handler?.getBoundingClientRect()!;
      const boxRect: DOMRect | undefined =
        this._el.nativeElement.getBoundingClientRect();

      const handlerX = this.plane === 'vertical' ? handlerRect.top : handlerRect.left
      const handlerY = this.plane === 'vertical' ? handlerRect.bottom : handlerRect.right


      if (
        handlerRect &&
        boxRect &&
        handlerRect.left + handlerRect.width >= boxRect.left &&
        handlerRect.right - handlerRect.width <= boxRect.right &&
        result <= 100 &&
        result >= 0
      ) {
        this._renderer.setStyle(imgContainer, 'width', `${result}%`);
        this._renderer.setStyle(handler, 'left', `${result}%`);
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this._isDragging = false;
  }

  addClass(element: Element | ChildNode, verticalClass: string, horizontalClass: string): void {
    if(this.plane === 'vertical'){
      this._renderer.addClass(element, `${verticalClass}`)
    } else {
      this._renderer.addClass(element, `${horizontalClass}`)
    }
  }
}

import { Injectable } from '@angular/core';
import { CoordinatesModel } from '../models/coordinates.model';

@Injectable()
export class ComparisonService {
  isMouseOnElement(mouse: MouseEvent, element: HTMLElement | null): boolean {
    if (!element) {
      return false;
    }

    const handlerRect = element.getBoundingClientRect();

    console.log(
      'isMouseOnElement: ',
      mouse.clientX >= handlerRect.left &&
        mouse.clientX <= handlerRect.right &&
        mouse.clientY <= handlerRect.bottom &&
        mouse.clientY >= handlerRect.top
    );

    return (
      mouse.clientX >= handlerRect.left &&
      mouse.clientX <= handlerRect.right &&
      mouse.clientY <= handlerRect.bottom &&
      mouse.clientY >= handlerRect.top
    );
  }

  calcComparisonResult(
    direction: string,
    mouse: MouseEvent,
    element: HTMLElement | null,
    handler: HTMLElement | null
  ): number | null {
    if (!element || !handler) {
      return null;
    }
    const mouseCoordinates: CoordinatesModel = {
      x: mouse.clientX,
      y: mouse.clientY,
    };

    if (direction === 'vertical') {
      console.log('vertical');
      return this._calcVerticalComparisonData(
        mouseCoordinates,
        element,
        handler
      );
    }

    if (direction === 'horizontal') {
      console.log('horizontal');
      return this._calcHorizontalComparisonData(
        mouseCoordinates,
        element,
        handler
      );
    }

    return null;
  }

  private _calcVerticalComparisonData(
    mouseCoordinates: CoordinatesModel,
    element: HTMLElement,
    handler: HTMLElement
  ): number | null {
    const handlerRect: DOMRect = handler.getBoundingClientRect();
    const elementRect: DOMRect = element.getBoundingClientRect();
    const elementHeight: number = element.offsetHeight;
    const elementTop: number = element.offsetTop;

    const result = ((mouseCoordinates.y - elementTop) / elementHeight) * 100;

    if (
      handlerRect.top + handlerRect.height >= elementRect.top &&
      handlerRect.bottom - handlerRect.height <= elementRect.bottom &&
      result <= 100 &&
      result >= 0
    ) {
      return result;
    }

    return null;
  }

  private _calcHorizontalComparisonData(
    mouseCoordinates: CoordinatesModel,
    element: HTMLElement,
    handler: HTMLElement
  ): number | null {
    const handlerRect: DOMRect = handler.getBoundingClientRect();
    const elementRect: DOMRect = element.getBoundingClientRect();
    const elementWidth: number = element.offsetWidth;
    const elementLeft: number = element.offsetLeft;

    const result = ((mouseCoordinates.x - elementLeft) / elementWidth) * 100;

    if (
      handlerRect.left + handlerRect.width >= elementRect.left &&
      handlerRect.right - handlerRect.width <= elementRect.right &&
      result <= 100 &&
      result >= 0
    ) {
      return result;
    }

    return null;
  }
}

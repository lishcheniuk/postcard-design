import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appEdit]',
})
export class EditDirective {
  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mousedown', ['$event']) onMousedown(event: MouseEvent) {
    const beginX = event.pageX;
    const blockLeft = this.el.nativeElement.offsetLeft;

    const moveHandler = this.r.listen(
      this.el.nativeElement,
      'mousemove',
      (e: MouseEvent) => {
        const left = e.pageX - beginX + blockLeft;

        if (left <= 0 || left >= this.el.nativeElement.offsetWidth) {
          return;
        }
        this.r.setStyle(this.el.nativeElement, 'marginLeft', `${left}px`);
      }
    );

    const mouseupHandler = this.r.listen(
      this.el.nativeElement,
      'mouseup',
      () => {
        moveHandler();
        mouseupHandler();
      }
    );

    const mouseleaveHandler = this.r.listen(
      this.el.nativeElement,
      'mouseleave',
      () => {
        moveHandler();
        mouseupHandler();
        mouseleaveHandler();
      }
    );
  }
}

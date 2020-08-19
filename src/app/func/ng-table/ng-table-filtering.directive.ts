import { Directive, EventEmitter, ElementRef, Renderer2, HostListener, Input, Output } from '@angular/core';

function setProperty(Renderer2: Renderer2, elementRef: ElementRef, propName: string, propValue: any): void {
  Renderer2.setProperty(elementRef, propName, propValue);
}

@Directive({
  selector: '[ngTableFiltering]'
})
export class NgTableFilteringDirective {
  @Input() public ngTableFiltering: any = {
    filterString: '',
    columnName: 'name'
  };

  @Output() public tableChanged: EventEmitter<any> = new EventEmitter();

  @Input()
  public get config(): any {
    return this.ngTableFiltering;
  }

  public set config(value: any) {
    this.ngTableFiltering = value;
  }

  private element: ElementRef;
  private Renderer2: Renderer2;

  @HostListener('input', ['$event.target.value'])
  public onChangeFilter(event: any): void {
    this.ngTableFiltering.filterString = event;
    this.tableChanged.emit({filtering: this.ngTableFiltering});
  }

  public constructor(element: ElementRef, Renderer2: Renderer2) {
    this.element = element;
    this.Renderer2 = Renderer2;
    // Set default value for filter
    setProperty(this.Renderer2, this.element, 'value', this.ngTableFiltering.filterString);
  }

}

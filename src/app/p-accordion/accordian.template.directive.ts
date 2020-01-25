import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[pTemplate]'
})
export class PrimeTemplateDirective {

  @Input() type: string;

  @Input('pTemplate') name: string;

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    return this.name;
  }
}

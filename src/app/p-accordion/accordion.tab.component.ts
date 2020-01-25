import {
  NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter,
  ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef, TemplateRef, ViewRef
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { EHeaderComponent } from './header.component';
import { EAccordionComponent } from './accordion.component';
import { PrimeTemplateDirective } from './accordian.template.directive';

let idx = 0;

@Component({
  selector: 'e-accordionTab',
  templateUrl: './accordion.tab.component.html',
  styleUrls: ['./accordion.tab.component.css'],
  animations: [
    trigger('tabContent', [
      state('hidden', style({
        height: '0'
      })),
      state('void', style({
        height: '{{height}}'
      }), { params: { height: '0' } }),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', animate('{{transitionParams}}')),
      transition('void => hidden', animate('{{transitionParams}}')),
      transition('void => visible', animate('{{transitionParams}}'))
    ])
  ],
  preserveWhitespaces: true
})
export class EAccordionTabComponent implements OnDestroy, AfterContentInit {

  @Input() header: string;
  @Input() selected: boolean;
  @Input() disabled: boolean;
  @Input() cache = true;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

  @ContentChildren(EHeaderComponent) headerFacet: QueryList<EHeaderComponent>;
  @ContentChildren(PrimeTemplateDirective) templates: QueryList<any>;

  // tslint:disable-next-line: variable-name
  private _animating: boolean;

  get animating(): boolean {
    return this._animating;
  }
  set animating(val: boolean) {
    this._animating = val;

    if (!(this.changeDetector as ViewRef).destroyed) {
      this.changeDetector.detectChanges();
    }
  }

  contentTemplate: TemplateRef<any>;

  id = `ui-accordiontab-${idx++}`;

  loaded: boolean;

  accordion: EAccordionComponent;

  constructor(@Inject(forwardRef(() => EAccordionComponent)) accordion, public changeDetector: ChangeDetectorRef) {
    this.accordion = accordion as EAccordionComponent;
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;

        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }

  toggle(event) {
    if (this.disabled || this.animating) {
      return false;
    }

    this.animating = true;
    const index = this.findTabIndex();

    if (this.selected) {
      this.selected = false;
      this.accordion.onClose.emit({ originalEvent: event, index });
    } else {
      if (!this.accordion.multiple) {
        for (const aTab of this.accordion.tabs) {
          aTab.selected = false;
          aTab.selectedChange.emit(false);
        }
      }

      this.selected = true;
      this.loaded = true;
      this.accordion.onOpen.emit({ originalEvent: event, index });
    }

    this.selectedChange.emit(this.selected);

    event.preventDefault();
  }

  findTabIndex() {
    let index = -1;
    for (let i = 0; i < this.accordion.tabs.length; i++) {
      if (this.accordion.tabs[i] === this) {
        index = i;
        break;
      }
    }
    return index;
  }

  get hasHeaderFacet(): boolean {
    return this.headerFacet && this.headerFacet.length > 0;
  }

  onToggleDone(event: Event) {
    this.animating = false;
  }

  ngOnDestroy() {
    this.accordion.tabs.splice(this.findTabIndex(), 1);
  }
}

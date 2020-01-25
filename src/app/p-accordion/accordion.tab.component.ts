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
  template: `
      <div class="ui-accordion-header ui-state-default ui-corner-all" [ngClass]="{'ui-state-active': selected,'ui-state-disabled':disabled}">
          <a [attr.tabindex]="disabled ? -1 : 0" [attr.id]="id" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="selected" (click)="toggle($event)"
              (keydown)="onKeydown($event)">
              <span class="ui-accordion-toggle-icon" [ngClass]="selected ? accordion.collapseIcon : accordion.expandIcon"></span>
              <span class="ui-accordion-header-text" *ngIf="!hasHeaderFacet">
                  {{header}}
              </span>
              <ng-content select="e-header" *ngIf="hasHeaderFacet"></ng-content>
          </a>
      </div>
      <div [attr.id]="id + '-content'" class="ui-accordion-content-wrapper" [@tabContent]="selected ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" (@tabContent.done)="onToggleDone($event)"
          [ngClass]="{'ui-accordion-content-wrapper-overflown': !selected||animating}"
          role="region" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id">
          <div class="ui-accordion-content ui-widget-content">
              <ng-content></ng-content>
              <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                  <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
              </ng-container>
          </div>
      </div>
  `,
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

  @Input() cache: boolean = true;

  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

  @ContentChildren(EHeaderComponent) headerFacet: QueryList<EHeaderComponent>;

  @ContentChildren(PrimeTemplateDirective) templates: QueryList<any>;

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
    let index = this.findTabIndex();

    if (this.selected) {
      this.selected = false;
      this.accordion.onClose.emit({ originalEvent: event, index: index });
    } else {
      if (!this.accordion.multiple) {
        for (var i = 0; i < this.accordion.tabs.length; i++) {
          this.accordion.tabs[i].selected = false;
          this.accordion.tabs[i].selectedChange.emit(false);
        }
      }

      this.selected = true;
      this.loaded = true;
      this.accordion.onOpen.emit({ originalEvent: event, index: index });
    }

    this.selectedChange.emit(this.selected);

    event.preventDefault();
  }

  findTabIndex() {
    let index = -1;
    for (var i = 0; i < this.accordion.tabs.length; i++) {
      if (this.accordion.tabs[i] == this) {
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

  onKeydown(event: KeyboardEvent) {
    if (event.which === 32 || event.which === 13) {
      this.toggle(event);
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.accordion.tabs.splice(this.findTabIndex(), 1);
  }
}

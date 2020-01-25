import {
  Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter,
  ContentChildren, QueryList, ChangeDetectorRef, TemplateRef, ViewRef, Inject, forwardRef, NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';

let idx = 0;

/**
 * Header Component
 * Add header content inside e-header
 */
@Component({
  selector: 'e-header',
  template: '<ng-content></ng-content>'
})
export class EHeaderComponent {
}

/**
 * Tab Component
 * Tab component of the accordion
 */
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
export class EAccordionTabComponent implements OnDestroy {

  @Input() header: string;
  @Input() selected: boolean;
  @Input() disabled: boolean;
  @Input() cache = true;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

  @ContentChildren(EHeaderComponent) headerFacet: QueryList<EHeaderComponent>;

  // tslint:disable-next-line: variable-name
  private _animating: boolean;

  contentTemplate: TemplateRef<any>;
  id = `ui-accordiontab-${idx++}`;
  tabIndex = idx;
  loaded: boolean;
  accordion: EAccordionComponent;

  get animating(): boolean {
    return this._animating;
  }

  set animating(val: boolean) {
    this._animating = val;

    if (!(this.changeDetector as ViewRef).destroyed) {
      this.changeDetector.detectChanges();
    }
  }

  constructor(@Inject(forwardRef(() => EAccordionComponent)) accordion, public changeDetector: ChangeDetectorRef) {
    this.accordion = accordion as EAccordionComponent;
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

/**
 * Main Accordion Component.
 * Place tab components inside the main component
 */
@Component({
  selector: 'e-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class EAccordionComponent implements BlockableUI, AfterContentInit, OnDestroy {

  @Input() multiple: boolean;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onOpen: EventEmitter<any> = new EventEmitter();

  @Input() style: any;
  @Input() styleClass: string;
  @Input() expandIcon = 'fa fa-plus';
  @Input() collapseIcon = 'fa fa-minus';

  @ContentChildren(EAccordionTabComponent) tabList: QueryList<EAccordionTabComponent>;

  tabListSubscription: Subscription;

  // tslint:disable-next-line: variable-name
  private _activeIndex: any;

  public tabs: EAccordionTabComponent[] = [];

  constructor(public el: ElementRef, public changeDetector: ChangeDetectorRef) { }

  ngAfterContentInit() {
    this.initTabs();

    this.tabListSubscription = this.tabList.changes.subscribe(_ => {
      this.initTabs();
      this.changeDetector.markForCheck();
    });
  }

  initTabs(): any {
    this.tabs = this.tabList.toArray();
    this.updateSelectionState();
  }

  getBlockableElement(): HTMLElement {
    return this.el.nativeElement.children[0];
  }

  @Input() get activeIndex(): any {
    return this._activeIndex;
  }

  set activeIndex(val: any) {
    this._activeIndex = val;
    this.updateSelectionState();
  }

  updateSelectionState() {
    if (this.tabs && this.tabs.length && this._activeIndex != null) {
      for (let i = 0; i < this.tabs.length; i++) {
        const selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
        const changed = selected !== this.tabs[i].selected;

        if (changed) {
          this.tabs[i].animating = true;
          this.tabs[i].selected = selected;
          this.tabs[i].selectedChange.emit(selected);
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.tabListSubscription) {
      this.tabListSubscription.unsubscribe();
    }
  }
}

/**
 * EAccordionModule Module
 * Bundle all the components together
 */
@NgModule({
  imports: [CommonModule],
  exports: [EAccordionComponent, EAccordionTabComponent, EHeaderComponent],
  declarations: [EAccordionComponent, EAccordionTabComponent, EHeaderComponent]
})
export class EAccordionModule { }

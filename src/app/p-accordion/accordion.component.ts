import {
  Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter,
  ContentChildren, QueryList, ChangeDetectorRef
} from '@angular/core';
import { BlockableUI } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EAccordionTabComponent } from './accordion.tab.component';

@Component({
  selector: 'e-accordion',
  template: `
      <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass" role="tablist">
          <ng-content></ng-content>
      </div>
  `
})
export class EAccordionComponent implements BlockableUI, AfterContentInit, OnDestroy {

  @Input() multiple: boolean;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onOpen: EventEmitter<any> = new EventEmitter();

  @Input() style: any;

  @Input() styleClass: string;

  @Input() expandIcon = 'pi pi-fw pi-chevron-right';

  @Input() collapseIcon = 'pi pi-fw pi-chevron-down';

  @ContentChildren(EAccordionTabComponent) tabList: QueryList<EAccordionTabComponent>;

  tabListSubscription: Subscription;

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

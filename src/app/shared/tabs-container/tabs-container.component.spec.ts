import { TabsContainerComponent } from './tabs-container.component';
import { TabComponent } from '../tab/tab.component';
import { QueryList } from '@angular/core';

describe('TabsContainerComponent', () => {
  let component: TabsContainerComponent;

  beforeEach(() => {
    component = new TabsContainerComponent();
    component.tabs = new QueryList<TabComponent>();
  });

  it('should select tab', () => {
    const tab1 = new TabComponent();
    const tab2 = new TabComponent();
    component.tabs.reset([tab1, tab2]);
    component.selectTab(tab1);
    expect(tab1.active).toBe(true);
    expect(tab2.active).toBe(false);
  });

  it('should select first tab if no active tabs', () => {
    const tab1 = new TabComponent();
    const tab2 = new TabComponent();
    component.tabs.reset([tab1, tab2]);
    component.ngAfterContentInit();
    expect(tab1.active).toBe(true);
    expect(tab2.active).toBe(false);
  });
});

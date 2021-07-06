import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuItemViewComponent } from './top-menu-item-view.component';

describe('TopMenuItemViewComponent', () => {
  let component: TopMenuItemViewComponent;
  let fixture: ComponentFixture<TopMenuItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMenuItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

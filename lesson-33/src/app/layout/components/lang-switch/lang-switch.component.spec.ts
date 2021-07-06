import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSwitchViewComponent } from './lang-switch.component';

describe('LangSwitchViewComponent', () => {
  let component: LangSwitchViewComponent;
  let fixture: ComponentFixture<LangSwitchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangSwitchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangSwitchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

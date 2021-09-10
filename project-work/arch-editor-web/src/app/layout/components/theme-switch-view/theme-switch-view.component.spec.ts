import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitchViewComponent } from './theme-switch-view.component';

describe('ThemeSwitchViewComponent', () => {
  let component: ThemeSwitchViewComponent;
  let fixture: ComponentFixture<ThemeSwitchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeSwitchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

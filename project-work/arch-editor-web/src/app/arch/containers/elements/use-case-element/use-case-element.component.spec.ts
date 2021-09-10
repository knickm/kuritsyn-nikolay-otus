import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseElementComponent } from './use-case-element.component';

describe('UseCaseElementComponent', () => {
  let component: UseCaseElementComponent;
  let fixture: ComponentFixture<UseCaseElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCaseElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

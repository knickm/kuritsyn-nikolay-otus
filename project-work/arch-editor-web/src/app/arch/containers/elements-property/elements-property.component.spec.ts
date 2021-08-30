import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsPropertyComponent } from './elements-property.component';

describe('ElementsPropertyComponent', () => {
  let component: ElementsPropertyComponent;
  let fixture: ComponentFixture<ElementsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorElementComponent } from './actor-element.component';

describe('ActorElementComponent', () => {
  let component: ActorElementComponent;
  let fixture: ComponentFixture<ActorElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

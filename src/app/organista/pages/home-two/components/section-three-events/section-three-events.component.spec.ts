import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionThreeEventsComponent } from './section-three-events.component';

describe('SectionThreeEventsComponent', () => {
  let component: SectionThreeEventsComponent;
  let fixture: ComponentFixture<SectionThreeEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionThreeEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionThreeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
